import httplib2
data=input('Your data:')
host=input('Your host:')
method='POST'
headers={'Host':host}
url='http://'+host+':5533/upload.html'
h = httplib2.Http()
resp,content = h.request(url,method,data,headers)
import json
x = json.loads(content.decode()) #load string
print(x)