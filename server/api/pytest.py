import os

print(__file__)
print(os.chdir('../../downloads'))
print(os.getcwd())
print(os.path.dirname(os.path.abspath(__file__)))
print(os.chdir(os.path.dirname(os.path.abspath(__file__))))
print(os.getcwd())
print(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))