
class Position:
    delta = {
        'W':(-1,0),
        'E':(1,0),
        'N':(0,-1),
        'S':(0,1),
        None:(0,0),
    }
    def __init__(self,x,y,direction=None):
        self.x = x
        self.y = y
        self.d = direction #a 3-tuple {x,y,d}
    def moveNext(self,direction,newDirection=None): #蛇头不需要newDirection选项
        self.x += Position.delta[direction][0]
        self.y += Position.delta[direction][1]
        self.d = newDirection
    def isPositive(self):
        return self.x >= 0 and self.y >= 0
    def copy(self,direction=None):
        return Position(self.x,self.y,direction) if direction else Position(self.x,self.y,self.d)
    def isOccupied(self,x,y):
        if self.x == x and self.y == y:
            return True
        return False
    def manhaDis(self,another_position):#曼哈顿距离
        return abs(self.x-another_position.x)+abs(self.y-another_position.y)
    def __str__(self):
        return '('+str(self.x)+','+str(self.y)+','+str(self.d)+')'

class Snake:
    reversed = {
        'W':'E',
        'E':'W',
        'N':'S',
        'S':'N',
        None:None,
    }
    def __init__(self,x,y,reminder=[]):
        self.i = Position(x,y)  #index of head
        self.r = reminder             #reminders

    def move(self,direction='W'):
        self.r.insert(0,self.i.copy(Snake.reversed[direction]))
        self.i.moveNext(direction)
        self.r.pop() #去除最后一个元素
        return self
    
    def eat(self,direction='W'):
        self.r.insert(0,self.i.copy(Snake.reversed[direction]))
        self.i.moveNext(direction)
        return self
    def getState(self):
        y=chr(self.i.x)+ chr(self.i.y)
        for i in self.r:
            y=y+i.d
        return y
        
    def isInside(self,x,y):
        if self.i.isOccupied(x,y):
            return True
        else:
            for i in self.r:
                if i.isOccupied(x,y):
                    return True
        return False
    def copy(self):
        copied_r = [i.copy() for i in self.r]
        return Snake(self.i.x,self.i.y,copied_r)

    def hasInnerPoint(self):#判断一条蛇是否将map分为内外多个区域
        #import itertools
        #ch_r = itertools.chain([self.i],self.r)
        length = 1 + len(self.r)
        def __get(index):
            if index==0:
                return self.i
            else:
                return self.r[index-1]
        __checkSnake = None
        def __checkx(y_point,lower,upper):
            for x in range(lower,upper):
                if __checkSnake.isInside(x,y_point):
                    return True
            return False
        def __checky(x_point,lower,upper):
            for y in range(lower,upper):
                if __checkSnake.isInside(x_point,y):
                    return True
            return False
        x0 = __get(0)
        minx,miny = x0.x,x0.y
        maxx,maxy = x0.x,x0.y            
        for i in range(1,length):
            xi = __get(i)
            minx = min(minx,xi.x)
            miny = min(miny,xi.y)
            maxx = max(maxx,xi.x)
            maxy = max(maxy,xi.y) 
        #确定了矩形
        __checkSnake = self
        for recti in range(minx+1,maxx):
            for rectj in range(miny+1,maxy):
                if not __checkSnake.isInside(recti,rectj):
                    if __checkx(rectj,minx,recti) and __checkx(rectj,recti+1,maxx+1) and __checky(recti,miny,rectj) and __checky(recti,rectj+1,maxy+1):
                        return True            

        return False
                    
    
    def __str__(self):
        x = '('+ str(self.i.x)+','+str(self.i.y)+')'
        x = x + '---['
        for i in self.r:
            x = x + i.__str__()+','
        x = x + ']'
        return x
class SnakeMap:
    def __init__(self,length = 40,width = 40):
        self.l = length
        self.w = width
        self.left = self.w * self.l
    def setState(self,snake,food=None):
        self.snake = snake
        self.food = food
    def isFull(self):
        return self.left == 0
    def isFood(self,x,y):
        return self.food and self.food.isOccupied(x,y)
    def isInMap(self,x,y):
        return  0<=x < self.w and 0<= y<self.l
    def isFree(self,x,y): #如果x,y 在w,l之外就不行
        if self.isInMap(x,y) and not self.isFull():
            if self.food and self.isFood(x,y):
                return False
            else:
                return not self.snake.isInside(x,y)
        return False
    def canMove(self): #如何cannotMove避免这种尴尬情况的发生？
        xcanMove = False
        for d in ['W','E','S','N']:
            headCopy = self.snake.i.copy()
            headCopy.moveNext(d)
            xi,yi = headCopy.x,headCopy.y
            if self.isFood(xi,yi) or self.isFree(xi,yi):
                xcanMove = True
                break
        return xcanMove
        
    def findFoodPath(self): #搜索一条吃到食物的路径，没找到则返回空集，找到则返回形如 'W','S','E'的路径
        #如果food 不和合法，就不需要寻找
        foodx = self.food.x
        foody = self.food.y
        if not self.isInMap(foodx,foody) or self.snake.isInside(foodx,foody) or self.snake.i.isOccupied(foodx,foody):
            raise Exception('2:Food position illegal')
        #如果蛇的四周都没有位置，食物放在什么地方都不能被吃到，此时需要抛出CannotMove异常
        if not self.canMove():
            raise Exception('0:CannotMove Exception') #作为异常抛出的一种新用法
        q = []
        snakeq = [] #同步队列
        visited = set()
        pathParent = {}
        initState = self.snake.getState() #直接使用蛇头的位置作为状态,因为在针对一个食物的搜索问题中，显然是不行的
        q.insert(0,initState)
        snakeq.insert(0,self.snake)
        pathParent[initState]=None
        while len(q) > 0:
            state = q.pop()
            snake = snakeq.pop()
            visited.add(state)
            for d in ['W','E','S','N']:
                tempSnake = snake.copy()
                tempSnake.move(d)
                xi = tempSnake.i.x
                yi = tempSnake.i.y
                if not self.isInMap(xi,yi) or snake.isInside(xi,yi):#只要移动的头不在上一条蛇的身上即可
                    #错误：使用一条静态的蛇来判断，卧槽，debug了n久
                    #self.snake.isInside(xi,yi) 哦，天哪，该死的，我这是在做什么
                    continue
                if self.isFood(xi,yi):
                    eaten_snake = snake.copy().eat(d)
                    if eaten_snake.hasInnerPoint():
                        print('has inner')
                        temp = (self.snake,self.food)
                        self.snake = eaten_snake
                        self.food = None
                        self.drawStrMap()
                        self.snake ,self.food = temp
                        input()
                        continue
                    path = [d]
                    prev = pathParent[state]
                    while prev:
                        path.insert(0,prev[1])
                        prev = pathParent[prev[0]]
                    self.snake = eaten_snake  #蛇增加体积
                    self.left -= 1 #减少可用的数量
                    self.generateFood()
                    return path
                else:
                    s = tempSnake.getState()
                    if not s in visited:
                        q.insert(0,s)
                        snakeq.insert(0,tempSnake)
                        pathParent[s] = (state,d)
        return []
            
        
    def generateFood(self):
        if self.isFull():
            raise Exception('Map is full')
        import time
        import random
        random.seed(time.time())
        while True:
            x = random.randint(0,self.w-1)
            y = random.randint(0,self.l-1)
            if not self.snake.isInside(x,y):
                break
        self.food =Position(x,y)
    
    def __str__(self):
        return 'Map:'+str(self.l)+'*'+str(self.w)+'\n'+'Food:'+'('+str(self.food.x)+','+str(self.food.y)+')\n'+'Snake:'+str(self.snake)
    def drawStrMap(self):
        #Food : #
        #Snake head : $
        #Snake body : o
        #border : | or -
        def __draw(ch):
            print(ch,end='')
        for i in range(self.w+2):
            for j in range(self.l+2):
                if i == 0 or i==self.w+1:
                    __draw('-')
                elif j==0 or j == self.l+1:
                    __draw('|')
                elif self.isFood(j-1,i-1):
                    __draw('#')
                elif self.snake.i.isOccupied(j-1,i-1):
                    __draw('$')
                elif self.snake.isInside(j-1,i-1):
                    __draw('o')
                else:
                    __draw('*')
            print()
                    
    
        
        
def testSnake():
    s = Snake(0,0)
    s.move('S')
    s.move('E')
    print(s)
    s.eat('S')
    s.eat('S')
    print(s)
    
    smap = SnakeMap(5,5)
    smap.setState(s,Position(4,4))
    #print(smap)
    #s.move('W')
    smap.generateFood()
    #print(smap.isFree(1,2))
    while not smap.isFull():
        print('==============')
        print(smap)
        smap.drawStrMap()
        if not smap.canMove():
            print('Cannot move anymore')
            break
        solu = smap.findFoodPath()
        print(solu)
        if not solu:
            print('Cannot reach there,generate another Food')
            smap.generateFood()
            #input()
        print(smap.left)
    
    
if __name__=='__main__':
    testSnake()
    
