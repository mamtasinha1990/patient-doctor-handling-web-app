class Doctor(models.Model):
   name = models.CharField(max_length=120, blank=True, null=True)
   degree = models.CharField(max_length=120, blank=True, null=True)
   speciality = models.CharField(max_length=120, blank=True, null=True)
   class Meta:
       db_table = 'list_of_doctors'


class Patient(models.Model):
    name = models.CharField(max_length=120, blank=True, null=True)
    contact = models.PositiveIntegerField(blank=True, null=True)
    emailid = models.CharField(max_length=120, blank=True, null=True)
    gender = models.CharField(max_length=120, blank=True, null=True)
    doctor = models.ForeignKey(Doctor, blank=True, null=True)
    class Meta:
            db_table = 'list_of_patients'
