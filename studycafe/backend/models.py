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