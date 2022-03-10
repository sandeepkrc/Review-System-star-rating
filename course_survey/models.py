from django.db import models
from userauthn.serializers import User
from course.models import Course

#options based survey
class Survey(models.Model):
    #QUESTION ID BY DEFAULT CREATED
    oraganization_id = models.CharField(max_length=200)
    course = models.ForeignKey(Course,on_delete=models.CASCADE)#map with course table
    question = models.CharField(max_length=200)
    option = models.JSONField()# jason field for storing array
  
    
 #options based survey feedback   
class Feedback(models.Model): 
    question = models.ForeignKey(Survey,on_delete=models.CASCADE)#map with q table   
    feedback = models.CharField(max_length=200,null=True)# jason field for storing array
    # or may be single value
    # Learner_id = models.CharField(max_length=200)
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    is_answer = models.BooleanField(default=False)
    
 
 
#star based survey   
class StarSurvey(models.Model):
    question = models.CharField(max_length=200)
    #response may me number like no of star 5 or 10
    response = models.CharField(max_length=100)
    # for course id
    course = models.ForeignKey(Course,on_delete=models.CASCADE)
    class Meta:
        db_table = 'star_survey'
    

   
    
#star feedback
class Rating(models.Model):
    qid = models.ForeignKey(StarSurvey,on_delete=models.CASCADE)
    userid = models.ForeignKey(User,on_delete=models.CASCADE)
    response = models.CharField(max_length=100)
    is_answer = models.BooleanField(default=False)
    class Meta:
        db_table = 'rating_survey'
