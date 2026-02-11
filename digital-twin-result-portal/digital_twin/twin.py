from predictor import predict

cpu = [20, 35, 55, 75]
users = [1000, 5000, 20000, 50000]

predicted_cpu = predict(cpu, users)

if predicted_cpu > 80:
    print("⚠️ Scale UP recommended")
else:
    print("✅ Resources sufficient")
