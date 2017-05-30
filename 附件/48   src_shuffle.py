def shuffle(seq):
    import time,random
    random.seed(time.time())
    max_size= len(seq)
    for i in range(max_size):
        new_index = random.randint(0,max_size-1)
        if new_index != i and seq[i]!=seq[new_index]:
            temp = seq[i]
            seq[i] = seq[new_index]
            seq[new_index] = temp
            
if __name__=='__main__':
    import random
    seq = [ 3, 4 , 5,64,12]
    seq2 = seq.copy()
    print(seq)
    shuffle(seq)
    random.shuffle(seq2)
    print(seq)
    print(seq2)