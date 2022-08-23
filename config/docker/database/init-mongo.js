conn = new Mongo();
db = conn.getDB("admin");
db.auth("e-commerce-backend-db-admin", "qLxyKWqD8muCdbpL");

db = conn.getDB("e-commerce-db");
db.createUser({ user: "eCommerceDBUser", pwd: "6T58NAsnuZVyNJqH", roles: ["readWrite"] });
