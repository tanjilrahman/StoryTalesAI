# Generated by Django 5.0.4 on 2024-05-10 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_story_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='story',
            name='title',
            field=models.CharField(),
        ),
    ]
