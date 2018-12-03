import json
import boto3
import io
import zipfile
import mimetypes

def lambda_handler(event, context):


    sns = boto3.resource('sns')
    topic  = sns.Topic('arn:aws:sns:us-west-2:182934946837:deployPortfolioTopic')
    
    try:
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
       
        topic.publish(Subject='Portfolio for Patel Sales Corporation uploaded', Message='Please check your PortFolio Deployed Successfully')
    except:
        topic.publish(Subject='Failed to upload portfolio for Patel Sales Corporation', Message='Please check your PortFolio Deployed Successfully')
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
        
    }
