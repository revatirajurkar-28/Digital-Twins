import numpy as np
from sklearn.linear_model import LinearRegression

def predict(cpu, users):
    model = LinearRegression()
    X = np.array(users).reshape(-1,1)
    y = cpu
    model.fit(X, y)
    future_users = [[100000]]
    return model.predict(future_users)
