class Vehicle {
    protected String brand;

    public Vehicle(String brand) {
        this.brand = brand;
    }

    public void honk() {
        System.out.println("Honk, Honk!");
    }
}

class Car extends Vehicle {
    private final String modelName;

    public Car(String modelName, String brand) {
        super(brand);
        this.modelName = modelName;
    }

    public void display() {
        System.out.println(brand + " " + modelName);
    }
}

public class CarInheritance {
    public static void main(String[] args) {
        Car myCar = new Car("M5 Competition", "BMW");
        myCar.honk();
        myCar.display();

        Vehicle myVehicle = new Vehicle("BMW");
        myVehicle.honk();
    }
}

