#import collections #I wanted to use collections.namedtuple
class MathUtil:
    @staticmethod
    def stepProduct(n):
        if n == 0 or n == 1:
            return 1
        p=1
        for i in range(n):
           p *= (i+1) 
        return p
    @staticmethod
    def perm(n,m):
        return MathUtil.stepProduct(n)/MathUtil.stepProduct(n-m)
    @staticmethod
    def comb(n,m):
        return MathUtil.perm(n,m)/MathUtil.stepProduct(m)
class Card:
    NUMS = [ 'A','2','3','4','5','6','7','8','9','10','J','Q','K','G' ]
    COLORS = [ 'CLUB','HEART','SPADE','DIAMOND','BLACK','RED'] #顺序： 黑桃，红桃，梅花，方块
    def __init__(self,number,color='CLUB'):
        self.number = number
        self.color = color
    def copy(self):
        return Card(self.number,self.color)
    def __str__(self):
        return '('+self.number+','+self.color+')' 
class PokerCards:
    BLACKJOKER = Card('G','BLACK')
    REDJOKER = Card('G','RED')   
    X_TYPE1_NUM_VALUEMAP={#斗地主的顺序
        'A':11,
        '2':12,
        '3':0,
        '4':1,
        '5':2,
        '6':3,
        '7':4,
        '8':5,
        '9':6,
        '10':7,
        'J':8,
        'Q':9,
        'K':10,
        'G':13,
    }
    X_TYPE1_NUM_FINDMAP={
        11:'A',12:'2',13:'G',0:'3',1:'4',2:'5',3:'6',4:'7',5:'8',6:'9',7:'10',8:'J',9:'Q',10:'K',
    }
    X_TYPE1_COLOR_VALUEMAP=None #花色没有顺序
    X_TYPE1_TELL_TYPES=['Zero','Unknown','Single','Double','Triple','TripleWithOne','Boomb','ConnectedSingles','ConnectedDoubles','Nothing','MultiTriples']
                        #0      1           2       3       4           5               6       7               8                   9       10
    def __init__(self,cards=None,shuffled=False,sorted=False):
        if cards==None:
            self.cards=PokerCards.generateCards()
        else:
            self.cards=cards
        self.shuffled = shuffled
        self.sorted = sorted
    @staticmethod
    def generateCards():
        x = []
        for i in range(len(Card.NUMS)-1):
            for j in range(len(Card.COLORS)-2):
                x.append(Card(Card.NUMS[i],Card.COLORS[j]))
        x.append(PokerCards.BLACKJOKER.copy())
        x.append(PokerCards.REDJOKER.copy())
        return x
    @staticmethod
    def makeCards(cards,shuffled=False,sorted=False):
        madeCards=[]
        for i in cards:
            if i=='1':
                continue
            elif i=='0':
                madeCards.append(Card('10'))
            else:
                madeCards.append(Card(i))
        return PokerCards(madeCards,shuffled,sorted)
    @staticmethod #@depreciated 应当停止使用，按状态机太麻烦而且不准确
    def tellCardsType(pokercards):#cards是PokerCards类型,由于需要将cards排序，所以需要改变原来的cards
        #返回：如果cards是空，返回'
        pokercards.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)#排序
        cards=pokercards.cards
        typeIndex = [0] #类型集合,主类型+其他类型
        curIndex = 0
        lastCard = None
        curCard = None
        X = PokerCards.X_TYPE1_NUM_VALUEMAP #值映射
        while curIndex < len(cards):
            curCard = cards[curIndex]
            if typeIndex[0] == 0:
                typeIndex[0] = 2  #单牌single
            elif typeIndex[0] == 2:
                if lastCard.number == curCard.number:
                    if lastCard.number == 'G':#如果是猴子，就是炸弹
                        typeIndex[0] = 6 #炸弹
                    else:   #对子
                        typeIndex[0] = 3   
                elif X[curCard.number] - X[lastCard.number]== 1:
                    if X[curCard.number] > X['A']:#在A以上，不可能是连对
                        typeIndex = [1,5]  #UNKNOW 1 : 1 5
                    else:
                        typeIndex = [1,5,7] #主类型未知，次类型可能是3带1，也有可能是连牌
                                            #UNKNOW 2 : 1 5 7
                else:
                    typeIndex = [1,5] #主类型未知,次类型3带1
            elif typeIndex[0]==3:#之前是对子
                if lastCard.number == curCard.number:
                    typeIndex[0] = 4 #三张牌
                elif X[curCard.number] - X[lastCard.number] == 1:
                    if X[curCard.number] > X['A']:
                        typeIndex[0]=[9] #什么都不是
                    else:
                        typeIndex = [1,8] #主类型未知，次类型可能是连对 #UNKNOW 3 : 1 8
                else:
                    typeIndex[0] = 9 #什么都不是
            elif typeIndex[0]==4:#之前是三张牌
                if lastCard.number == curCard.number:
                    typeIndex[0] = 6 #炸弹
                else:
                    typeIndex[0] = 5 #3带1
            elif typeIndex[0] == 9:#Nothing 直接推出
                break
            elif typeIndex[0] in [5,6]: #如果已经是一些确定不能增长的牌，再加牌就什么也不是
                typeIndex[0] = 9
            elif typeIndex[0] == 7:#之前是连牌
                if X[curCard.number]- X[lastCard.number] ==1:
                    if X[curCard.number]>X['A']:
                        typeIndex[0] = 9
                    else:
                        typeIndex[0] = 7
                else:
                    typeIndex[0] = 9
            elif typeIndex[0]==8:#之前是连对
                if X[curCard.number] > X['A']:
                    typeIndex[0] = 9
                elif X[curCard.number]- X[lastCard.number] ==1:
                    typeIndex = [1,8] #主类型未知，次类型连对
                else:
                    typeIndex[0] = 9                
            elif typeIndex[0] == 1:#未知的类型,根据次类型来进行判断，1 5， 1 5 7， 1 8
                while True:
                    if typeIndex[1] == 8:
                        if X[curCard.number] > X['A']:
                            typeIndex[0] = 9
                            break #不可能是连对
                        if curIndex%2 == 0:#偶数
                            if X[curCard.number] - X[lastCard.number] == 1:
                                typeIndex = [1,8]
                            else:
                                typeIndex[0] = 9
                            break
                        elif curCard.number==lastCard.number:
                            if curIndex >= 5:#之前已经有5张
                                typeIndex[0] = 8 #连对
                            else:
                                typeIndex = [1,8]
                            break
                        else:
                            typeIndex[0] = 9
                            break
                    if len(typeIndex) == 3: #第三个元素是7
                        if  X[curCard.number] <= X['A'] and X[curCard.number] - X[lastCard.number] ==1:
                            if curIndex >= 4:#在5张牌或者以上
                                typeIndex[0]=7
                            elif curIndex < 4:
                                typeIndex = [1,7,7]
                            break
                    if typeIndex[1] == 5:#可能是3带1
                        if lastCard.number == curCard.number and curIndex > 1:
                            if curIndex == 3:
                                typeIndex[0] = 5 #3带1
                            elif curIndex < 3:
                                typeIndex = [1,5] #目前2带1
                            else: #4带1，什么都不是
                                typeIndex[0] = 9
                            break
            lastCard = cards[curIndex]
            curIndex += 1
        if typeIndex[0] == 1:
            typeIndex[0] = 9
        return PokerCards.X_TYPE1_TELL_TYPES[typeIndex[0]]
    @staticmethod
    def analyzeCard(pokercards):
        pokercards.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)#排序
        cards = pokercards.cards
        num_card = {}
        X = PokerCards.X_TYPE1_NUM_VALUEMAP
        #统计牌的张数
        for i in cards:
            if i.number not in num_card:
                num_card[i.number]=1
            else:
                num_card[i.number]+=1
        #连牌分析
        i=0
        cs_start,cd_start,ct_start =0,0,0
        cs_nums,cd_nums,ct_nums=0,0,0
        last = -1
        cs_cards,cd_cards,ct_cards={},{},{}
        while i<len(cards):
            if X[cards[i].number] <= X['A']:
                if last == -1:
                    cs_start = 0
                    cs_nums = 1
                    if num_card[cards[i].number] >= 2:
                        cd_start = 0
                        cd_nums = 1 
                    if num_card[cards[i].number] >= 3:
                        ct_start = 0
                        ct_nums = 1
                elif X[cards[i].number] - X[cards[last].number] == 1:
                    cs_nums += 1
                    if num_card[cards[i].number] >= 2: #对子分析
                        if cd_nums == 0:
                            cd_start=i
                        cd_nums += 1
                    elif cd_nums >= 3:
                        cd_cards[cards[cd_start].number] = cd_nums
                        cd_nums = 0
                    else:
                        cd_nums = 0
                    if num_card[cards[i].number] >= 3: #三张牌分析
                        if ct_nums == 0:
                            ct_start=i
                        ct_nums += 1
                    elif ct_nums >=2:
                        ct_cards[cards[ct_start].number] = ct_nums
                        ct_nums = 0
                    else:
                        ct_nums = 0
                else:
                    if cs_nums >= 5: #构成连牌
                        cs_cards[cards[cs_start].number] = cs_nums
                    if cd_nums >= 3:
                        cd_cards[cards[cd_start].number] = cd_nums
                    if ct_nums >= 2:
                        ct_cards[cards[ct_start].number] = ct_nums
                    cs_start,cs_nums = i,1
                    if num_card[cards[i].number] >= 2:
                        cd_start,cd_nums = i,1
                    if num_card[cards[i].number] >= 3:
                        ct_start,ct_nums = i,1
            else: #在A以上，停止分析
                break
            last = i
            i+=num_card[cards[i].number]
        if cs_nums>=5:
            cs_cards[cards[cs_start].number] = cs_nums
        if cd_nums >= 3:
           cd_cards[cards[cd_start].number] = cd_nums
        if ct_nums >=2:
            ct_cards[cards[ct_start].number] = ct_nums
        analyzed_card = {
            'num':num_card,
            'cs':cs_cards,
            'cd':cd_cards,
            'ct':ct_cards,
        }
        return analyzed_card
    @staticmethod#两者的大小关系，
    #a > b  1
    #a < b   -1
    # a = b 完全相同 0
    #a,b没有关系 2
    def compareCards(pokercards_a,pokercards_b):
        a = pokercards_a
        b = pokercards_b
        an_a = PokerCards.atomicCardsType(a)
        an_b = PokerCards.atomicCardsType(b)
        X = PokerCards.X_TYPE1_NUM_VALUEMAP
        if an_b[0] == 6:#b是炸弹
            if an_a[0] == 6:
                if X[an_a[1]] == X[an_b[1]]:
                    return 0
                else:
                    return 1 if X[an_a[1]] > X[an_b[1]] else -1
            else:
                return -1
        elif an_a[0] == 6:
            return 1
        elif an_a[0] != an_b[0]:#类型不同
            return 2
        elif an_a[0] == 0:#类型相同
            return 0 #空气
        elif an_a[0] in [2,3,4,5] or (an_a[0] in [7,8] and an_a[2]==an_b[2]) or (an_a[0] == 10 and an_a[2] == an_b[2] and an_a[3] == an_b[3]):
            if an_a[1] == an_b[1]:
                return 0
            else:
                return 1 if X[an_a[1]]>X[an_b[1]] else -1
        else:
            return 2 #不可比较
        
        
    #空气 :  -- 
    #单牌 : 5  -- 5
    #对子 : 55 -- 5
    #炸弹 : 4444 -- 4
    #3带1 : 4443 -- 4 3
    #3个  : 444 -- 4
    #连对 : 33445566 -- 3 4
    #连牌 : 34567 -- 3 5
    #飞机 : 333444555678 -- 3(起始) 3(数目) 1(带单牌) 6 7 8 
    #注：包含冗余信息
    @staticmethod #判定牌的原子类型和具体信息
    def atomicCardsType(pokercards):
        pokercards.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)
        cards = pokercards.cards
        length = len(pokercards.cards)
        if length == 0:
            return (0)
        elif length == 1:
            return (2,cards[0].number)
        elif length == 2:#对子或炸弹
            if cards[0].number=='G':
                return (6,'G')
            else:
                return (3,cards[0].number)
        elif length == 3:
            return (4,cards[0].number)
        elif length == 4:
            if cards[0] == cards[3]:
                return (6,cards[0]) #炸弹
            elif cards[0] == cards[1]:
                return (5,cards[0].number,cards[3].number)
            else:
                return (5,cards[3].number,cards[0].number)
        elif length >= 5:
            #统计牌的张数
            count = {}
            for i in cards:
                if i.number in count:
                    count[i.number] += 1
                else:
                    count[i.number] =1
            type,times,others = -1,0,[]
            start = -1
            for i in count.items():
                if i[1]==3:
                    if start == -1 or start > i[0]:
                        start = i[0]
                    type = 10
                    times += 1
                elif i[1]==2:
                    if type == 10:#33444555
                        others.append(i[0])
                        others.append(i[0])
                    else:
                        type = 8
                        times += 1
                elif type == -1 or type == 10:
                    others.append(i[0])
                    times +=1
                 
            if type==-1:
                return (7,cards[0].number,times) #连牌
            elif type == 8: #连对
                return (8,cards[0].number,times)
            else: #飞机
                return (10,start,times,others)
            
    def shuffleCards(self):
        import random,time
        random.seed(time.time())
        random.shuffle(self.cards)
        self.shuffled=True
        self.sorted = False
    def dealCards(self,nums,usePreviousShuffle=True):
        if nums<len(self.cards):
            if not usePreviousShuffle or not self.shuffled:
                self.shuffleCards()
            x = self.cards[:nums]
            self.cards = self.cards[nums:]
        else:
            x = cards
            self.cards = []
        return PokerCards(x,self.shuffled,self.sorted)
    def sortCards(self,numValueMap=None,colorValueMap=None,reversed=False):#定义牌的顺序
        if self.sorted:
            return
        def keyFunc(card):
            x = []
            if numValueMap and card.number in numValueMap:
                x.append(numValueMap[card.number])
            else:
                x.append(0)
            if colorValueMap and card.color in colorValueMap:
                x.append(colorValueMap[card.color])
            else:
                x.append(0)
            return x
        self.cards.sort(key=keyFunc,reverse=reversed)
        self.shuffled=False
        self.sorted = True
    def __str__(self,simplified=True):
        s = '['
        for i in self.cards:
            if simplified:
                s += ' '+i.number
            else:
                s += ' '+i.__str__()
        s+=']'
        return s
    @staticmethod #简单的计数概率
    def getSimpleProbability(card_number,card_count):
        C = MathUtil.comb
        k = card_count
        modif=4
        if card_number == 'G':
            modif = 2
        if card_count > modif or card_count<0:
            return 0
        return C(modif,k)*C(54-modif,17-k)/C(54,17)
    @staticmethod #连牌，连对，飞机的概率
    #it's time to use cache<是时候使用函数的缓存计算了
    def getConnectedProbability(card_start_number,card_count,typeIndex=7):#默认7连单牌，8连对  10飞机
        '''type=7 连单牌，8连对，10飞机'''
        i,j = card_start_number,card_count
        C = MathUtil.comb
        X = PokerCards.X_TYPE1_NUM_VALUEMAP
        common_div = C(54,17)
        def modelCalc(j,k):#j--numbers k--num_list of each element,counting n.
            p = 1
            s=0
            for x in range(j):
                p *= C(4,k[x])
                s += k[x]
            return p*C(54-4*j,17-s)/common_div
        def generateKLists(j,lower,upper):
            from itertools import product
            return product(range(lower,upper+1),repeat=j)
        calcMap={
            7:1,
            8:2,
            10:3,
        }
        checkMap={
            7:5,
            8:3,
            10:2,
        }
        if X[i] + j - 1 > X['A']:#impossible
            return 0
        if j < checkMap[typeIndex]:#invalid
            return 0
        s = 0
        for lst in generateKLists(j,calcMap[typeIndex],4):
            s += modelCalc(j,lst)
        return s
    #从自己的牌中选择一副能大的牌
    #尽量不要破坏小概率的牌。
    #因为能打小概率的牌同样也是小概率的
    def selectCards(self,targetPokerCards):
        #牌成分析
        self.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP) #保证牌已经排序
        an = PokerCards.analyzeCard(self)
        
        card_num = an['num'] #num,cs,cd,ct
        cards = self.cards
        a_type = PokerCards.atomicCardsType(targetPokerCards)
        X = PokerCards.X_TYPE1_NUM_VALUEMAP
        keys = ['ct','cd','cs']
        keys_index = {
            'ct':10,
            'cd':8,
            'cs':7,
        }
        allowedMin = {
            'ct':2,
            'cd':3,
            'cs':5,
        }
        minNums = {
            'ct':3,
            'cd':2,
            'cs':1,
        }
        selectedCards = None
        length = len(cards)
        #单牌有可能破坏所有的牌型
        #对子可能破坏 3个，炸弹，连对，飞机
        #3个可能破坏    炸弹，连对
        #已经选择了一副牌（简便表示法）
        #check ct cs ct
        #
        def checkConnected():
            pass
        def checkNoneConnected():
            pass
            
        if a_type[0] == 0:#空气牌，选择概率最小的非炸弹牌出
            for j in keys:
                if an[j]:
                 
                 selectedCards = [keys_index[j],an[j]]
            if selectedCards == None:
                selectedCards = [2,cards[0].number] #单牌
        elif a_type[0] == 2:#单牌
            i = 0
            #while 不是函数，所以不能直接写 i<len(cards),那样每次都要调用len()       
            while i < length:
                if X[cards[i].number] > X[a_type[1]]:
                    goodFaith = True
                    for j in keys_index:
                        for z in an[j].items():
                            if not goodFaith:
                                break
                            if (0 <= X[cards[i].number] - X[z[0]]  < z[1]):#在连牌的范围之内
                                if card_num[cards[i].number] <= minNums[j]: #如果牌的数量极限小
                                    Lleft = X[cards[i].number] - X[z[0]] #如果设置模糊点的界限，左右都可以剩余1，0张，甚至针对牌的大小进行判断，小牌如333444就不能拆
                                    Rleft = z[1] - X[cards[i].number] - 1
                                    if (Lleft == 0 or Lleft >= allowedMin[j]) and (Rleft ==0 or Rleft >= allowedMin[j]):
                                        pass
                                    else:
                                        goodFaith = False
                        if not goodFaith:
                            break
                    if goodFaith:
                        selectedCards = [2,cards[i].number]
                        if PokerCards.compareCards(PokerCards.transferToPokerCards(selectedCards),targetPokerCards) == 1:
                            break
                        else:
                            selectCards = None
                i+=card_num[cards[i].number]
        elif a_type[0] == 2:#对子
            i = 0
            while i < length:
                if card_num[cards[i].number] >= 2:
                    
        else:
            pass
        
        if selectedCards == None:
            #查找炸弹
            selectedCards = [0]
            pass
        return PokerCards.transferToPokerCards(selectedCards)
    @staticmethod
    def testSelect():
        mycards=PokerCards.makeCards('345678910JQK')
        her_cards = PokerCards.makeCards('K')
        _ = mycards.selectCards(her_cards)
        print(_)
        
        print('===End of  testSelect()')
    @staticmethod#将压缩的表示法扩展成PokerCards类型
    def transferToPokerCards(simplified):
        type_i = simplified[0]
        cards = []
        repeat = {
            0:0,
            2:1,
            3:2,
            4:3,
            5:3,
            6:4,
            7:1,
            8:2,
            10:3,
        }
        X = PokerCards.X_TYPE1_NUM_VALUEMAP
        XF = PokerCards.X_TYPE1_NUM_FINDMAP
        if type_i in [0,2,3,4,5,6]:
            for i in range(repeat[type_i]):
                cards.append(simplified[1])
        if type_i == 5: #3带1
            cards.append(simplified[2])
        elif type_i in [7,8,10]: #连牌
            for i in range(simlified[2]):
                for j in range(repeat[type_i]):
                    cards.append(XF[i+X[simplified[1]]])
        if type_i == 10 and simplified[2]==1:#有单牌
            cards.extend(simplified[3])
        return PokerCards.makeCards(cards)
    @staticmethod
    def testFunctions():
        cards = PokerCards()
        print(cards)
        c1=cards.dealCards(17)
        c2=cards.dealCards(17)
        c3=cards.dealCards(17)
        c1.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)
        c2.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)
        c3.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)
        print(c1)
        print(c2)
        print(c3)
        print(cards)
        #wrong 1: 334678  #corrected at 2017-02-02 11:52:10
        testTellCards = '33445566878999910JJJJQKKAAAGG'
        t = PokerCards.makeCards(testTellCards)
        t.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)
        print(t)
        p = PokerCards.tellCardsType(t)
        print(p)
        a = PokerCards.analyzeCard(t)
        print(a)
        a_2 = PokerCards.analyzeCard(PokerCards())
        #print(a_2)
        
        test2 = '678910JQ'
        t2 = PokerCards.makeCards(test2)
        t2.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)
        print(t2)
        _ = PokerCards.atomicCardsType(t2)
        print(_)
        test3 = '78910JQK'
        t3 = PokerCards.makeCards(test3)
        t3.sortCards(PokerCards.X_TYPE1_NUM_VALUEMAP,PokerCards.X_TYPE1_COLOR_VALUEMAP)
        print(t3)
        _ = PokerCards.compareCards(t2,t3)
        print(_)        

if __name__=='__main__':
    
    PokerCards.testSelect()
    input()
    _ = PokerCards.transferToPokerCards([5,'5','6'])
    print(_)
    input()
    x = []
    for i in range(5):
        x.append(PokerCards.getSimpleProbability('G',i))
    print(x)
    print(sum(x))
    
    print('======')
    #for i in range(1,13): #very slow,but done
        #print(PokerCards.getConnectedProbability('3',i))
    #print('type=8')
    for i in range(1,13):
        print(PokerCards.getConnectedProbability('3',i,8))
    print('type=10')
    for i in range(1,13):
        print(PokerCards.getConnectedProbability('3',i,10))
    #PokerCards.testFunctions()
    
    