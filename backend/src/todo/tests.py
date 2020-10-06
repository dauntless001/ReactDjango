from django.test import TestCase
from .models import Todo
# Create your tests here.


class TodoTestCase(TestCase):
    @classmethod
    def setUpTestData(cls):
        Todo.objects.create(task='Here me dey')
    
    def test_task_content(self):
        todo = Todo.objects.get(id=1)
        self.assertEqual(todo.task, 'Here me dey')