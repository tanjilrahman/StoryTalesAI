# Generated by Django 5.0.4 on 2024-05-09 13:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_story_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='story',
            name='image',
            field=models.TextField(),
        ),
    ]