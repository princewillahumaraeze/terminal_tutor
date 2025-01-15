from django.db import models


class Lesson(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class Task(models.Model):
    lesson = models.ForeignKey(Lesson, related_name='tasks', on_delete=models.CASCADE)
    description = models.TextField()
    command = models.CharField(max_length=200)
    order = models.IntegerField()

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.lesson.title} - Task {self.order}'
