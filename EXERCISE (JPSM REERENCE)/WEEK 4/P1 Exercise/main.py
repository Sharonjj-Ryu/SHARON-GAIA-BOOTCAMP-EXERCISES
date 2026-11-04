age = int(input("Enter your age: "))

if age >= 18:
    print("Adult")
else:
    print("Minor")

if 18 <= age <= 20:
    print("Freshman")
elif 21 <= age <= 22:
    print("Sophomore")
elif age > 22:
    print("Graduate")