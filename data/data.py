import json

with open('./personas.json') as personas:
    personas = json.load(personas)

with open('./base.json') as base:
    base = json.load(base)

name = []

output = {}

for p in personas:
    output.update({p:{}})
    name.append(p)



for b in base:
    if b['name'] in name:
        temp = b['name']
        print(temp)
        output[temp] = {
                'stats': b['stats'],
                'skills': b['skills'],
                'question' : personas[b['name']]['question'],
                'a': personas[b['name']]['a'],
                'b': personas[b['name']]['b'],
                'c': personas[b['name']]['c'], 
                'correct': personas[b['name']]['correct'],
                'arcana': personas[b['name']]['arcana'],
                'trait': personas[b['name']]['trait'],
                'inherits': personas[b['name']]['inherits'],
                'item': personas[b['name']]['item']    
            }

print(output)

with open('baseLimited.json','w') as outfile:
    json.dump(output, outfile)

