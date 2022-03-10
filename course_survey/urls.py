from django.urls import path
from .views import SurveyQuestionView,FeedbackView,SurveyQuestionGetView,StarSurveyView,RatinggetView,RatingView


urlpatterns = [
    
    path("question",SurveyQuestionView.as_view()),
    path("questionget",SurveyQuestionGetView.as_view()),
    path("feedback",FeedbackView.as_view()),
    #star
    path('starpost',StarSurveyView.as_view()),
    path('rating',RatingView.as_view()),#submit learner
    path('ratingget',RatinggetView.as_view()),#all response of a question
    # path("abc",Abc.as_view()),
    
]