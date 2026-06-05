from flask import Flask, jsonify, render_template
import random

app = Flask(__name__)

ROUTES = {
    "bus": [
        {
            "id": 0,
            "name": "21G — Broadway → Tambaram",
            "stops": ["Broadway", "Central", "Guindy", "Chrompet", "Tambaram"],
            "base_eta": 522,
            "next_stop": "Central Station"
        },
        {
            "id": 1,
            "name": "5C — Broadway → K.K. Nagar",
            "stops": ["Broadway", "Park Town", "T.Nagar", "K.K.Nagar"],
            "base_eta": 410,
            "next_stop": "Park Town Bus Stop"
        }
    ],

    "train": [
        {
            "id": 0,
            "name": "EMU — Beach → Tambaram",
            "stops": ["Beach", "Park", "Guindy", "Chrompet", "Tambaram"],
            "base_eta": 312,
            "next_stop": "Park Station"
        }
    ]
}

TRAFFIC = {
    "smooth": 1.0,
    "moderate": 1.45,
    "heavy": 2.1
}


@app.route("/")
def home():
    return render_template("Untitled-1.html")


@app.route("/api/routes/<mode>")
def get_routes(mode):
    return jsonify(ROUTES.get(mode, []))


@app.route("/api/eta/<mode>/<int:route_id>/<traffic>")
def get_eta(mode, route_id, traffic):

    routes = ROUTES.get(mode, [])

    route = next(
        (r for r in routes if r["id"] == route_id),
        None
    )

    if not route:
        return jsonify({"error": "Route not found"}), 404

    multiplier = TRAFFIC.get(traffic, 1.0)

    eta = int(route["base_eta"] * multiplier)

    eta += random.randint(-20, 20)

    return jsonify({
        "route": route["name"],
        "eta_seconds": eta,
        "next_stop": route["next_stop"],
        "traffic": traffic,
        "progress": round(random.uniform(0.3, 0.9), 2)
    })


@app.route("/api/refresh")
def refresh():

    return jsonify({
        "delay_change": random.randint(-15, 15),
        "progress_increase": round(random.uniform(0.01, 0.05), 2)
    })


if __name__ == "__main__":
    app.run(debug=True)