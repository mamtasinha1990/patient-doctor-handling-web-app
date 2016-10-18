
def main_view(request):
    return render_to_response('MainPage.html', context_instance = RequestContext(request))


def doctor_view(request):
    return render_to_response('DoctorForm.html', context_instance = RequestContext(request))

def doctor_register(request):
    x=json.loads(request.POST.get('data'))
    name = x['name']
    degree = x['degree']
    speciality = x['speciality']
    docobj = Doctor()
    docobj.name = str(name)
    docobj.degree = str(degree)
    docobj.speciality = str(speciality)
    docobj.save()
    return HttpResponse(1)

def listOfDoctor(request):
    doctor = Doctor.objects.filter()
    return render(request, 'ListOfDoctors.html', {'doctors': doctor}, context_instance=RequestContext(request))


def my_view(request):
    doctorsobj = DoctorSerializer(Doctor.objects.filter(),many=True).data
    return render(request, 'PatientForm.html', {'doctors': doctorsobj}, context_instance=RequestContext(request))


def ContToHtml(request):
   doctorsobj = DoctorSerializer(Doctor.objects.filter(), many=True).data
   return JSONResponse(doctorsobj)

def register(request):
    x= json.loads(request.POST.get('data'))
    name=x['name']
    contact=x['contact']
    emailid=x['emailid']
    gender=x['gender']
    doctor=x['doctor']
    petobj = Patient()
    petobj.name = str(name)
    petobj.contact = int(contact)
    petobj.emailid = str(emailid)
    petobj.gender = str(gender)
    petobj.doctor_id = str(doctor)
    petobj.save()
    print petobj
    return HttpResponse(1)

def list(request):
     patientsobj = PatientSerializer(Patient.objects.filter(), many=True).data
     return render(request, 'ListOfPatients.html', {'patients': patientsobj}, context_instance=RequestContext(request))
     
def ContToHtmlList(request):
    patientsobj = PatientSerializer(Patient.objects.filter(), many=True).data
    return JSONResponse(patientsobj)
   
def delete(request):
    if request.method == 'GET':
        request_id = request.GET.get('id')
        p = Patient.objects.get(id=request_id)
        p.delete()
        return HttpResponse(1)
    else:
        return HttpResponse(0)

def update(request):
    if request.method == 'POST':
        x = json.loads(request.POST.get('data'))
        request_id = x['id']
        petobj = Patient.objects.get(id=request_id)
        name = x['name']
        contact = x['contact']
        emailid = x['emailid']
        gender = x['gender']
        doctor = x['doctor']
        petobj.name = str(name)
        petobj.contact = int(contact)
        petobj.emailid = str(emailid)
        petobj.gender = str(gender)
        petobj.doctor_id = str(doctor)
        petobj.save()
        return HttpResponse(1)
    else:
        return HttpResponse(0)

