from fastapi import FastAPI, HTTPException
# import sentiment as se
import random
import os 
import json
import numpy as np
import nltk
import train as t
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_origins=['*']
)

def random_line(fname):
    lines = open(fname).read().splitlines()
    return random.choice(lines)

ERROR_THRESHOLD = 0.1
# load our calculated weight values
weights_file = 'weights.json' 
with open(weights_file) as data_file: 
    weights = json.load(data_file) 
    W1 = np.asarray(weights['weight1']) 
    W2 = np.asarray(weights['weight2'])
    b1 = np.asarray(weights['bias1']) 
    b2 = np.asarray(weights['bias2'])
    all_words = weights['words']
    classes = weights['classes']
    
def clean_sentence(verification_data):
    line = verification_data
    # Remove whitespace from line and lower case iter
    line = line.strip().lower()
    # Removing word with @ sign as we dont need name tags of twitter
    line = " ".join(filter(lambda x:x[0]!='@', line.split()))
    # Remove punctuations and numbers from the line
    punct = line.maketrans("","",'.*%$^0123456789#!][\?&/)/(+-<>')
    result = line.translate(punct)
    # Tokenize the whole tweet sentence
    tokened_sentence = nltk.word_tokenize(result)
    # We take the tweet sentence from tokened sentence
    sentence = tokened_sentence[0:len(tokened_sentence)]
    return sentence    

def verify(sentence, show_details=False):
    bag=[0]*len(all_words)
    cleaned_sentence = clean_sentence(sentence)
    # This line returns the bag of words as 0 or 1 if words in sentence are found in all_words
    x = t.encode_sentence(all_words,cleaned_sentence,bag)
    x = np.array(x)
    x = x.reshape(x.shape[0],1)
    

    if show_details:
        print ("sentence:", sentence, "\n bow:", x)
    # input layer is our encoded sentence
    l0 = x
    # matrix multiplication of input and hidden layer
    l1 = t.relu(np.dot(W1,l0)+b1)
    # output layer
    l2 = t.softmax(np.dot(W2,l1)+b2)
    
    return l2

def classify(sentence, show_details=False):
    results = verify(sentence, show_details)
    results = [[i,r] for i,r in enumerate(results) if r>ERROR_THRESHOLD ] 
    results.sort(key=lambda x: x[1], reverse=True) 
    return_results =[[classes[r[0]],r[1]] for r in results]
    return return_results


class Mood (BaseModel):
    mood:str

def get_mood(input_mood:Mood):
    return input_mood.mood
def convert (text :str):
    return ([i.lower() for i in text.split()])

@app.get("/")
async def root():
    return {"Welcome_message": "Here I am  your mood guesser bot, I will send you jokes and memes which will make you happy!"}


# input_mood = input("Hi :) How are you feeling today ?  ")
@app.post("/mood")
async def mood_guessing(input_mood :Mood ):
    if(not(get_mood(input_mood))):
        raise HTTPException(status_code=400, 
                            detail = "Please Provide a valid text message")

    tokens=["hello",'hi','ohk','okay','byee','bye','nice','good','fine','well','better','bad','sad','not','none']
    l:str 
    # mood:list
    flag:bool
    if (len((get_mood(input_mood)).split())<=4):
        lis = convert(get_mood(input_mood))
        for token in tokens:
            if token in lis:
                l = " Hey I can help you out if you are in trouble ! All you need to write your heart out ;)"
                flag =False
                break
            else :
                l = " Write more clearly about your day , or else it is difficult for me to understand :( "
                flag=False

    elif(len((get_mood(input_mood)).split())<=7):
        l= " Please write in more detail, i am here to listen :) " 
        flag = False
    else:    
        mood=classify(get_mood(input_mood))
        if (mood[0][0] == "anger" or mood[0][0] == "sadness" or mood[0][0] == "fear" ):
            l=random_line('lines.txt')
            flag=True;
        else :
            l=random_line('lines1.txt')
            flag=False;
    
    return {  "reply" : l , 
              "flag" : flag
           }



# if mood == 'anger'
#  fear < 50 ===> anxiety 
#  sad < 50 ===> tired and disturbed 
#  angry < 50 ===> disturbed 
# joy <50 ===> Mood Alright 
#  input ->model 
# fear , sadness , anger , joy , anxiety, tired and disturbed, disturbed , Mood Alright

# input 
         
            # for i in mood :
            #     if i[0] == "sadness":
            #         if i[1]<0.5:
            #             i[0]= "tired and disturbed"
            #     elif i[0]=="joy":
            #         if i[1] <0.5:
            #             i[0]="Mood Alright"
            #     elif i[0] =="fear":
            #         if i[1] <0.5:
            #             i[0]="anxiety"
            #     elif i[0] =="anger":
            #         if i[1] <0.5:
            #             i[0]="disturbed"