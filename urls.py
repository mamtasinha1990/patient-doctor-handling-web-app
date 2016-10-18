urlpatterns = patterns(

    url(r'^mainPage/', main_view),
    url(r'^my_view/', my_view),
    url(r'^register/$', register),
    url(r'^list/$', list, name='list'),
    url(r'^delete/$', delete, name='delete'),
    url(r'^updatePatientDetails/$', update ) ,
    url(r'^api-auth/$', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^doctor_view/', doctor_view),
    url(r'^doctorRegister/$', doctor_register),
    url(r'^listDoctor/$', listOfDoctor),
    url(r'^dataFromConToHtml/$', ContToHtml ),
    url(r'^dataFromConToHtmlList/$', ContToHtmlList),
    
)
