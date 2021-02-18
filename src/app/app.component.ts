import { Component, OnInit,  VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular ' + VERSION.major;

  objectA = [
  {
    "name":"node12",
    "id":11,
    "is_open":true,
    "children":
      [
        {"name":"child2","id":3},
        {"name":"child1","id":2}
      ]
  }];

  objectB = [
  {
    "name":"node11",
    "name2":"node11",
    "is_open":false,
    "children":
    [
      {"name":"child2","id":3},
      {"name":"child1","id":2}
    ]
  }]

  diff: any;

  ngOnInit(){
    /*
      We are comparing two objects: a and b.
    Object b is newer and similar to a.
    We are looking for changes from a to b.
    We assume that data types haven't changed (String to Number).
    We assume that parent is either an Array or an Object.
*/
    this.getDiff(this.objectA,this.objectB);
    console.log("Reference",this.objectA);
    console.log("Comparing with",this.objectB);
    console.log("Diff",this.getDiff(this.objectA,this.objectB));
  }

  getDiff(a, b){
    this.diff = ( this.isArray(a) ? [] : {});
    this.recursiveDiff(a, b, this.diff);
    // console.log("Diff",this.diff);
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

}