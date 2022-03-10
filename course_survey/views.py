from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Survey,Feedback,Rating,StarSurvey
from .serializers import SurveySerializer,FeedbackSerializer,SurveyGetSerializer,StarSurveySerializer,RatingSerializer,RatinggetSerializer
from common.encrypt_decrypt import AESEncryptionDecryption
import json
import logging


logger = logging.Logger('catch_all')
enc_dec_obj = AESEncryptionDecryption()

#For creating new survey -  POLL MULTIPLE OPTIONS ===WORKING
class SurveyQuestionView(APIView):
    serializer_class = SurveySerializer
    queryset = Survey.objects.none()
    def post(self, request, format=None):
        decrypted_data = json.loads(enc_dec_obj.decrypt_text(request.data))
        try:
            serializer = SurveySerializer(data=decrypted_data)
            if serializer.is_valid():
                serializer.save()
                res={"status":"success","surveyquestion":serializer.data}
                encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
                return Response({"data":encrypted_data})
            res = {'status': 'error','message': serializer.errors}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})
        except Exception as e:
            logger.error("------>",e)
            res = {"status":"exception",'detail':"Exceptions occur !"}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})

#For getting survey questions  POLL + STAR BOTH === WORKING
class SurveyQuestionGetView(APIView):
    serializer_class = SurveyGetSerializer
    queryset = Survey.objects.none()
    def post(self, request, format=None):
        decrypted_data = json.loads(enc_dec_obj.decrypt_text(request.data))
        try:
            querysets = Survey.objects.filter(course_id = decrypted_data['course_id'])
            serializer = SurveySerializer(querysets, many=True)
            querysets2 = StarSurvey.objects.filter(course_id=decrypted_data['course_id'])
            serializer2 = StarSurveySerializer(querysets2,many=True)
            res={"status":"success","getsurvey":serializer.data,"starget":serializer2.data}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})
        except Exception as e:
            logger.error("------>",e)
            res = {"status":"exception",'detail':e}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})

#for submit feedback learner side - MCQ ==WORKING
class FeedbackView(APIView):
    serializer_class =FeedbackSerializer
    queryset = Feedback.objects.none()
    def get(self,request):
        try:
            querysets = Feedback.objects.all().order_by('-id')
            serializer = FeedbackSerializer(querysets,many=True)
            res={"status":"success","Feedback":serializer.data}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})
        except Exception as e:
            # logger.error("------>",e)
            res = {"status":"exception",'detail':"Exceptions occur !"}
            # encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            # return Response({"data":encrypted_data})
            return Response({"data":res})

    
    def post(self,request):
        decrypted_data = json.loads(enc_dec_obj.decrypt_text(request.data))
        try:
            serializer = FeedbackSerializer(data=decrypted_data)
            # serializer = FeedbackSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                print("+++++")
                res={"status":"success","Feedback":serializer.data}
                encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
                return Response({"data":encrypted_data})
            res = {'status': 'error','message': serializer.errors}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})    

        except Exception as e:
            logger.error("------>",e)
            res = {"status":"exception",'detail':"Exceptions occur !"}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})




# CREATE  API FOR STAR RATING =CREATE Q  ===WORKING 
class StarSurveyView(APIView):
    serializer_class =StarSurveySerializer
    queryset = StarSurvey.objects.none()
    def post(self,request):
        decrypted_data = json.loads(enc_dec_obj.decrypt_text(request.data))
        serializer = StarSurveySerializer(data=decrypted_data)
        if serializer.is_valid():
            serializer.save()
            res={"status":"success","starsurvey":serializer.data}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})
            # return Response({"data":"STAR SURVEY IS RUNNING ","da":serializer.data})
        res = {'status': 'error','message': serializer.errors}
        encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
        return Response({"data":encrypted_data})
    
    
# CREATE  API FOR STAR RATING =GET ALL QUESTION Q WOPPPPPP
# class Abc(APIView):
#     def post(self,request):

#         decrypted_data = json.loads(enc_dec_obj.decrypt_text(request.data))
#         print("sssssssssssssssssssssssssss",decrypted_data)
#         queryset = StarSurvey.objects.filter(course_id=decrypted_data['course_id'])
#         print("====",len(queryset))
#         if len(queryset)!= 0:
#             serializer = StarSurveySerializer(queryset,many=True)
#             res={"status":"success","starget":serializer.data}
#             encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
#             return Response({"data":encrypted_data})
        
#         res = {'status': 'error','message': "survey related to this course is not available"}
#         encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
#         return Response({"data":encrypted_data})
#        #WOOP   
#SUBMIT RESPONSE(LEARNETR)  working
class RatingView(APIView):
    serializer_class =RatingSerializer
    queryset = Rating.objects.none()
    def post(self,request):
        # print(repr(RatingSerializer))
        decrypted_data = json.loads(enc_dec_obj.decrypt_text(request.data))
        print("============",decrypted_data)
        # print(request.data)
        # serializer = RatingSerializer(data=request.data)
        serializer = RatingSerializer(data=decrypted_data)
        if serializer.is_valid():
            serializer.save()
            res={"status":"success","starsubmit": serializer.data}
            encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
            return Response({"data":encrypted_data})
        res = {'status': 'error','message': "Response Submitted"}
        encrypted_data = enc_dec_obj.encrypt_text(json.dumps(res))
        return Response({"data":encrypted_data})




# WOP   
#get response of star rating(all response for a question)
class RatinggetView(APIView):
    serializer_class = RatinggetSerializer
    queryset = Rating.objects.none()
    def post(self,request):
        # decrypted_data = json.loads(enc_dec_obj.decrypt_text(request.data))
        print("request.dats ====",request.data)
        print("====",request.data['qid_id'])
        # print("====",request.data['response'])
        print("====",request.data['is_answer'])
        querysets = Rating.objects.filter(qid=request.data['qid_id'])
        serializer = RatingSerializer(querysets,many=True)
        return Response({"data": serializer.data})
    # return Response({"data":"sajcgjksdvjfdvhnfd"})