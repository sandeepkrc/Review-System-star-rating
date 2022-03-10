from rest_framework import serializers
from .models import Survey,Feedback,StarSurvey,Rating

#post for option type
class SurveySerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField()
    class Meta:
        model = Survey
        fields = ('id','oraganization_id','course_id','question','option')

#for get  result options
class SurveyGetSerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField()
    class Meta:
        model = Survey
        fields = ('course_id','course')
    
# for post  feedback of option type 
class FeedbackSerializer(serializers.ModelSerializer):
    question_id = serializers.IntegerField()
    user_id = serializers.IntegerField()
    class Meta:
        model = Feedback
        fields =('id','question_id','user_id','feedback','is_answer')
  
  #for creating star question     
class StarSurveySerializer(serializers.ModelSerializer):
    course_id = serializers.IntegerField()
    class Meta:
        model = StarSurvey
        fields = ('id','question','response','course_id')
    
   
   
# for submitting star question        
class RatingSerializer(serializers.ModelSerializer):
    qid_id = serializers.IntegerField()#future work
    userid_id = serializers.IntegerField()#future work
    class Meta:
        model = Rating
        # fields = "__all__" 
        fields = ('id','qid_id','userid_id','response','is_answer')#future work
        
    #   WOP  FOR SUBMITING FEEDBACK   
class RatinggetSerializer(serializers.ModelSerializer):
    qid_id = serializers.IntegerField()
    # userid_id = serializers.IntegerField()#future work
    class Meta:
        model = Rating
        # fields = '__all__'
        fields = ('qid_id','is_answer')
        # fields = ('qid_id','response','is_answer')