#create
# - hours, minutes, seconds, milliseconds, coins received

# crud routes- ignored update coz dont need to update session once submitted

from flask import request, jsonify
from config import app, db
from models import Period, InventoryItems

@app.route("/periods", methods = ["GET"])
def get_periods():
    periods = Period.query.all() #getting all contexts in database
    json_periods = list(map(lambda x:x.to_json(), periods))
    return jsonify({"periods": json_periods}) #returns list of json periods

@app.route("/create_period", methods=["POST"])
def create_period():
    hours = request.json.get("hours")
    minutes = request.json.get("minutes")
    seconds = request.json.get("seconds")
    milliseconds = request.json.get("milliSeconds")
    coins = request.json.get("coins")
    datetime = request.json.get("dateTime")

    # if not hours or not minutes or not seconds or not milliseconds or not coins:
    #     return jsonify({"message": "uh oh error"}), 403,

    new_period = Period(hours=hours, minutes=minutes, seconds=seconds, milliseconds=milliseconds, coins= coins, datetime= datetime)
    try:
        db.session.add(new_period)
        db.session.commit() #permanently write to database
    except Exception as e:
        return jsonify({"message": "str(e)"}), 400
    
    return jsonify({"message": "study session recorded!"}), 201

@app.route("/update_coins/<int:number>", methods=["PUT"])
def update_coins(number):
    coin = Period.query.get(number)

    if not coin:
        return jsonify({"message" : "where it at"}), 404
    
    data = request.json

    coin.coins = data.get("coins",coin.coins)
    coin.hours = data.get("hours",coin.hours)
    coin.minutes = data.get("minutes",coin.minutes)
    coin.seconds = data.get("seconds",coin.seconds)
    coin.milliseconds = data.get("milliSeconds",coin.milliseconds)
    coin.datetime = data.get("dateTime",coin.datetime)

    db.session.commit()
    return jsonify({"message" : "coins updated"}), 200


@app.route("/delete_period/<int:periodid>", methods=["DELETE"])
def delete_contact(periodid):
    period = Period.query.get(periodid)

    if not period:
        return jsonify({"message": "period not found"}), 404

    db.session.delete(period)
    db.session.commit()

    return jsonify({"message": "Period deleted"}), 200





# routes for inventory table
@app.route("/items", methods = ["GET"])
def get_items():
    items = InventoryItems.query.all() #getting all contexts in database
    json_periods = list(map(lambda x:x.to_json(), items))
    return jsonify({"items": json_periods}) #returns list of json periods

@app.route("/create_items", methods=["POST"])
def create_items():
    name = request.json.get("name")
    price = request.json.get("price")
    amount = request.json.get("amount")

    # if not hours or not minutes or not seconds or not milliseconds or not coins:
    #     return jsonify({"message": "uh oh error"}), 403,

    new_item = InventoryItems(name=name, price=price, amount=amount)
    try:
        db.session.add(new_item)
        db.session.commit() #permanently write to database
    except Exception as e:
        return jsonify({"message": "str(e)"}), 400
    
    return jsonify({"message": "item recorded!"}), 201

@app.route("/update_items/<int:number>", methods=["PATCH"])
def update_items(number):
    thing = InventoryItems.query.get(number)

    if not thing:
        return jsonify({"message" : "where it at"}), 404
    
    data = request.json

    # thing.name = data.get("name",thing.name)
    # thing.price = data.get("price",thing.price)
    thing.amount = data.get("amount",thing.amount)

    db.session.commit()
    return jsonify({"message" : "item updated"}), 200


# @app.route("/delete_period/<int:periodid>", methods=["DELETE"])
# def delete_contact(periodid):
#     period = Period.query.get(periodid)

#     if not period:
#         return jsonify({"message": "period not found"}), 404

#     db.session.delete(period)
#     db.session.commit()

#     return jsonify({"message": "Period deleted"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all() #creating database
        #db.drop_all()
        #db.drop_all(bind_key="inventory")
    app.run(debug=True)


