# age = 5
# print(age > 0 and age < 10 )
# print(age > 0 or age > 10)
# print(not(age > 3))

# a = 1
# b = 1
# c = 0
# d = a and b and (not c)

# print(f"a = {a} ")
# print(f"b = {b} ")
# print(f"c = {c} ")
# print(f"d = a and b and (not c) = {d} ")

# for i in range (1, 6):
#     print(f"Number: {1}")

# for i in range (1, 6):
#     print(f"Number: {1}")
#     if i == 3:
#         break;
#     print (f"Odd Number: {1}")
# print("Loop ended")

# def greet_user():
#     print("Hello, welcome to the program!")
#     print("I hope you have a great experience")
#     print("Let's get started")

# greet_user()
# greet_user()

# def calculate_area(length, width):
#     area = length * width 
#     return area
# result = calculate_area(10, 5)
# print(f"Area: {result}")

# Lists
# fruits = ["APPLE", "BANANA", "ORANGE"]
# fruits.append("grape")
# fruits.insert(2, "mango")
# fruits.remove("apple")
# print(fruits)
# print(fruits[0])
# print(fruits[-1])

# numbers = [3, 1, 4, 5, 9, 2 ]
# numbers.sort()
# print(numbers)
# numbers.revers()
# print(numbers)
# print(numbers.count(1))
# print(numbers.index(1))

# todos = []
# todos.append("Buy groceries")
# todos.append("Clean the house")
# todos.append("Pay bills")
# print("TO-DO-LIST: ")
# for index, task in enumerate(todos, 1):
#     print(f"{index}. {task}")

# Dictionaries

# person = {
#     "name": "Sharon",
#     "age" : 30,
#     "city": "Kota kinabalu"

# }
# print(person["name"])
# person["email"] = "sharon@gmail.com"
# print(person)
# for key in person:
#     print(key)
# for value in person.values():
#     print(value)
# for key, value in person.items():
#     print(f"{key} : {value}")

# Error Handling 
# try :
#     result = 10 /0
# except:
#     print ("Error: Cannot divide by zero")
# finally: 
#     print ("Closing ... ")

# try: 
#     numerator = 10
#     denominator = int(input("Enter a deniminator: "))
#     result = numerator / denominator 
# except: 
#     print("Error: cannot divide by zero!")
# else:
#     print(f"Success! Result = {result}")
# finally:
#     print("Closing...")