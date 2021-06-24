let a =[{
    name: 'vlad',
    age: 15
}]
let b = a.find(user => (user.name === 'vlad' && user.age === 15));
console.log(b);