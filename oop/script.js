// const Car = function(name,initialSpeed){
//     this.name = name;
//     this.speed = initialSpeed;
// }

// Car.prototype.accelerate = function(){
//     this.speed += 10; 
// }

// Car.prototype.brake = function(){ 
//     this.speed -=5;
// }

// const bmw = new Car("BMW",120)
// const mercedes = new Car("Mercedes",120)

// bmw.accelerate()
// bmw.accelerate()
// mercedes.accelerate()
// mercedes.accelerate()
// console.log(bmw,mercedes)

// class Car {
//   constructor(name, speed) {
//     this.name = name;
//     this.speed = speed;
//   }

//   accelerate() {
//     this.speed += 10;
//     console.log(`${this.name} speed is ${this.speed}`);
//   }
//   break() {
//     this.speed -= 5;
//     console.log(`${this.name} speed is ${this.speed}`);
//   }

//   get speedUS() {
//     return this.speed / 1.6;
//   }
//   set speedUS(speed) {
//     this.speed = speed * 1.6;
//   }
// }

// const ford = new Car("Ford", 120);


// ford.accelerate()
// ford.speedUS = 120




// const EV = function(name,speed,charge){
//     Car.call(this,name,speed);
//     this.charge =charge;


// }
// EV.prototype = Object.create(Car.prototype)

// EV.prototype.accelerate = function(){
//     this.speed += 20;
//     this.charge -= 1;
//     console.log(`${this.name} goint at ${this.speed}, with a charge of ${this.charge}%`)
// }
// EV.prototype.chargeBattery = function(chargeTo){
//      this.charge = chargeTo
// }


// const tesla = new EV("Tesla",120,23)


// tesla.accelerate()




class CarCL {
    constructor(name,speed){
        this.name = name;
        this.speed = speed
    }
    accelerate(){
        this.speed += 10;
    }
    breake(){
        this.breake -=5;
    }
}


class EVCL extends CarCL{
    #charge;
    constructor(name,speed,charge){
        super(name,speed)
        this.#charge = charge;

    }
    accelerate(){
        this.speed += 20;
        this.#charge -=1;
        console.log(`${this.name} going at ${this.speed} km/h, with a charge of ${this.#charge}%`)
        return this;
    }
    breake(){
        this.speed -= 5;
        return this;
    }
    chargeBettery(chargeTo){
        this.#charge = chargeTo;
        return this
    }



}


const rivian = new EVCL("Rivian",120,90);


rivian.accelerate().breake().chargeBettery(80).accelerate()