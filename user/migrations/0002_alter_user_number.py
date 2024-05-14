# Generated by Django 5.0.6 on 2024-05-14 18:23

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='number',
            field=models.CharField(error_messages={'message': '정확한 휴대전화 번호를 입력해주세요'}, help_text={'message': '휴대전화 번호를 입력해주세요'}, max_length=20, validators=[django.core.validators.RegexValidator(regex='^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$')]),
        ),
    ]
