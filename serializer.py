class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
            model = Doctor

class PatientSerializer(serializers.ModelSerializer):
    # doctor = serializers.CharField(source='doctor.name', read_only=True)
    doctor = DoctorSerializer()
    class Meta:
            model = Patient
            field = {'name', 'contact', 'emailid', 'gender', 'doctor'}
