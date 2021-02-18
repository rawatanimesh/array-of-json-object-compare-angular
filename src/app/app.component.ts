import { Component, OnInit,  VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  
  diff: any;
  refIndex = 0;
  objKeyArray = [];

  objectArray =[
    {
    "name":"node12",
    "id":11,
    "is_open":true,
    "children":
      [
        {"name":"child2","id":3},
        {"name":"child1","id":2}
      ]
    },
    {
      "name":"node12",
      "is_open":true,
      "children":
        [
          {"name":"child2","id":3},
          {"name":"child1","id":2}
        ]
    },
    {
      "name":"node13",
      "id":11,
      "is_open":false,
      "children":
        [
          {"name":"child2","id":3},
          {"name":"child1","id":2}
        ]
    }
  ]

  ngOnInit(){
    /*
      We are comparing two objects: a and b.
      Object b is newer and similar to a.
      We are looking for changes from a to b.
      We assume that data types haven't changed (String to Number).
      We assume that parent is either an Array or an Object.
    */
    for(let i = 0; i < this.objectArray.length; i++){
      if(this.refIndex != i){
        console.log("Comparing "+this.refIndex+" object with "+i+" object");
        console.log("Diff",this.getDiff(this.objectArray[this.refIndex],this.objectArray[i]));
        if(this.diff){
          console.log('found changes');
          
        }
      }
    }

    this.getObjectKeys(this.objectArray[0]);
    
  }

  getDiff(a, b){
    this.diff = ( this.isArray(a) ? [] : {});
    this.recursiveDiff(a, b, this.diff);
    return this.diff;
  } 

  recursiveDiff(a, b, node){ 
    for(var prop in a){
      if(typeof b[prop] == 'undefined'){
        this.addNode(prop, '[[removed]]', node);
      }
      else if(JSON.stringify(a[prop]) != JSON.stringify(b[prop])){
        // if value
        if(typeof b[prop] != 'object' || b[prop] == null){
          this.addNode(prop, b[prop], node);
        }
        else {
          // if array
          if(this.isArray(b[prop])){
            this.addNode(prop, [], node);
            this.recursiveDiff(a[prop], b[prop], node[prop]);
          }
          // if object
          else {
            this.addNode(prop, {}, node);
            this.recursiveDiff(a[prop], b[prop], node[prop]);
          }
        }
      }
    }
  }

  addNode(prop, value, parent){
    parent[prop] = value;
  }

  isArray(obj){
    return (Object.prototype.toString.call(obj) === '[object Array]');
  }

  getObjectKeys(obj){
    this.objKeyArray = Object.keys(obj);
    console.log("object keys",this.objKeyArray);
  }

}