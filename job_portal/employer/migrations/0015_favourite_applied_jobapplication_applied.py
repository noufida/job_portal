# Generated by Django 4.1 on 2022-09-17 11:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employer', '0014_rename_wishlist_favourite'),
    ]

    operations = [
        migrations.AddField(
            model_name='favourite',
            name='applied',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='jobapplication',
            name='applied',
            field=models.BooleanField(default=False),
        ),
    ]