
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
    def moveNext(self,direction,newDirection=None):
        self.x = self.x + Position.delta[direction][0]
        self.y = self.y + Position.delta[direction][1]
        self.d = newDirection
    def isPositive(self):
        return self.x >= 0 and self.y >= 0
    def copy(self,direction=None):
        x = Position(self.x,self.y,self.d)
        if direction:
            x.d = direction
        return x
    def isOccupied(self,x,y):
        if self.x == x and self.y == y:
            return True
        return False
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
        self.r = self.r[:len(self.r) - 1]
    
    def eat(self,direction='W'):
        self.r.insert(0,self.i.copy(Snake.reversed[direction]))
        self.i.moveNext(direction)
    def getState(self):
        y=''
        y = y + chr(self.i.x)
        y = y + chr(self.i.y)
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
        x = Snake(self.i.x,self.i.y,self.r.copy())
        return x
    
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
        return self.food.isOccupied(x,y)
    def isFree(self,x,y):
        if Position(x,y).isPositive() and not self.isFull():
            if self.food and self.food.isOccupied(x,y):
                return False
            else:
                return not self.snake.isInside(x,y)
        return False
    
    def findFoodPath(self): #搜索一条吃到食物的路径，没找到则返回空集，找到则返回形如 'W','S','E'的路径
        q = []
        snakeq = []
        visited = set()
        pathParent = {}
        initState = self.snake.getState()
        q.insert(0,initState)
        snakeq.insert(0,self.snake)
        pathParent[initState]=None
        while len(q) > 0:
            state = q.pop()
            snake = snakeq.pop()
            visited.add(state)
            for d in ['W','E','S','N']:
                x = snake.copy()
                x.move(d)
                xi = x.i.x
                yi = x.i.y
                if self.isFood(xi,yi):
                    path = [d]
                    prev = pathParent[state]
                    while prev:
                        path.insert(0,prev[1])
                        prev = pathParent[prev[0]]
                    snake.eat(d)        #吃掉食物
                    self.snake = snake  #蛇增加体积
                    self.generateFood()
                    return path
                elif self.isFree(xi,yi):
                    s = x.getState()
                    if not s in visited:
                        q.insert(0,s)
                        snakeq.insert(0,x)
                        pathParent[s] = (state,d)
        return []
            
        
    def generateFood(self):
        if self.isFull():
            raise Exception('Map is full')
        import time
        import random
        random.seed(time.time())
        while True:
            x = random.randint(0,self.l-1)
            y = random.randint(0,self.w-1)
            if not self.snake.isInside(x,y):
                break
        self.food =Position(x,y)
    
    def __str__(self):
        return 'Map:'+str(self.l)+'*'+str(self.w)+'\n'+'Food:'+'('+str(self.food.x)+','+str(self.food.y)+')\n'+'Snake:'+str(self.snake)
    
        
    
        
        
def testSnake():
    s = Snake(0,0)
    s.move('S')
    s.move('E')
    print(s)
    s.eat('S')
    s.eat('S')
    print(s)
    
    smap = SnakeMap(10,10)
    smap.setState(s,Position(5,7))
    print(smap)
    s.move('W')
    smap.generateFood()
    #print(smap.isFree(1,2))
    while True:
        print('==============')
        print(smap)
        print(smap.findFoodPath())
    
    
if __name__=='__main__':
    testSnake()
    
