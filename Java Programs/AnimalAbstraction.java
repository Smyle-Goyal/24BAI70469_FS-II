class Animal {
    public void animalSound() {
        System.out.println("The animal makes a sound");
    }
}

class Dog extends Animal {
    @Override
    public void animalSound() {
        System.out.println("The dog barks");
    }
}

public class AnimalAbstraction {
    public static void main(String[] args) {
        Animal myAnimal = new Animal();
        Animal myDog = new Dog();

        myAnimal.animalSound();
        myDog.animalSound();
    }

    
}
