from config import db
from datetime import datetime

class Period(db.Model):
    id = db.Column(db.Integer, primary_key=True) 
    hours = db.Column(db.Integer, unique = False, nullable = False)
    minutes = db.Column(db.Integer, unique = False, nullable = False)
    seconds = db.Column(db.Integer, unique = False, nullable = False)
    milliseconds = db.Column(db.Integer, unique = False, nullable = False)
    coins = db.Column(db.Integer, unique = False, nullable = False)
    datetime = db.Column(db.String, unique = False, nullable = False)

    # converts all the fields above into python dictionary then to json to pass to api
    def to_json(self):
        return{
            "id": self.id,
            "hours": self.hours,
            "minutes": self.minutes,
            "seconds": self.seconds,
            "milliSeconds": self.milliseconds,
            "coins": self.coins,
            "dateTime" : self.datetime
         }
    
class InventoryItems(db.Model):
    __bind_key__ = 'inventory'
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.String, unique = False, nullable = False)
    price = db.Column(db.Integer, unique = False, nullable = False)
    amount = db.Column(db.Integer, unique = False, nullable = False)
    link = db.Column(db.String, unique = False, nullable = False)


    def to_json(self):
        return{
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "amount": self.amount,
            "link": self.link
         }
    

class PositionItems(db.Model):
    __bind_key__ = 'position'
    id = db.Column(db.Integer, primary_key=True) 
    image = db.Column(db.String, unique = False, nullable = False)
    x = db.Column(db.Integer, unique = False, nullable = False)
    y = db.Column(db.Integer, unique = False, nullable = False)

    def to_json(self):
        return{
            "id": self.id,
            "image": self.image,
            "x": self.x,
            "y": self.y
         }