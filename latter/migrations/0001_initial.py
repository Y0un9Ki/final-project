# Generated by Django 5.0.6 on 2024-05-21 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Answer',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('comment', models.TextField(blank=True, null=True)),
                ('update_date', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False, unique=True)),
                ('content', models.TextField()),
                ('update_date', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
