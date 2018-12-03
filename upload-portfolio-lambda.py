import json
import boto3
import io
import zipfile
import mimetypes

def lambda_handler(event, context):


    sns = boto3.resource('sns')
    topic  = sns.Topic('arn:aws:sns:us-west-2:182934946837:deployPortfolioTopic')
    
    location = {
        "bucketName": 'portfoliobuildwest.patelsalescorp.com',
        "objectKey": 'portfoliobuild.zip'
    }
    try:
        job = event.get("CodePipeline.job")
        
        if job:
            for artifact in job["data"]["inputArtifacts"]:
                if artifact["name"] == "MyAppBuild":
                    location = artifact["location"]["s3Location"]
                        
        print("Building PortFolio from")
        s3 = boto3.resource('s3')
        portfolio_bkt = s3.Bucket('portfolio.patelsalescorp.com')
        
        build_bkt = s3.Bucket(location["bucketName"])
        
        portfolio_zip = io.BytesIO()
        build_bkt.download_fileobj(location["objectKey"], portfolio_zip)
        
        with zipfile.ZipFile(portfolio_zip) as myzip:
            for nm in myzip.namelist():
                obj = myzip.open(nm)
                portfolio_bkt.upload_fileobj(obj,nm,ExtraArgs={'ContentType': mimetypes.guess_type(nm)[0]})
                portfolio_bkt.Object(nm).Acl().put(ACL='public-read')
       
        topic.publish(Subject='Portfolio for Patel Sales Corporation uploaded', Message='Please check your PortFolio Deployed Successfully')
        
        if job:
            codepipeline = boto3.client('codepipeline')
            codepipeline.put_job_success_result(jobId=job["id"])
    except:
        topic.publish(Subject='Failed to upload portfolio for Patel Sales Corporation', Message='Please check your PortFolio Deployed Successfully')
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
        
    }
