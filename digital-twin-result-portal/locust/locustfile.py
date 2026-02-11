from locust import HttpUser, task, between

class Student(HttpUser):
    wait_time = between(0.1, 0.5)

    @task
    def get_result(self):
        self.client.get("/result/101")

