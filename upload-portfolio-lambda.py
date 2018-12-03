import json
import boto3
import io
import zipfile
import mimetypes

def lambda_handler(event, context):

    
    s3 = boto3.resource('s3')
    portfolio_bkt = s3.Bucket('portfolio.patelsalescorp.com')
    
    build_bkt = s3.Bucket('portfoliobuildwest.patelsalescorp.com')
    
    portfolio_zip = io.BytesIO()
    build_bkt.download_fileobj('portfoliobuild.zip', portfolio_zip)
    
    with zipfile.ZipFile(portfolio_zip) as myzip:
        for nm in myzip.namelist():
            obj = myzip.open(nm)
            portfolio_bkt.upload_fileobj(obj,nm,ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
            portfolio_bkt.Object(nm).Acl().put(ACL='public-read')
   
   
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }
