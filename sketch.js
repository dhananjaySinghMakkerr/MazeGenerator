var size=40;
var current;
var rows,cols;
var grid=[];
var stack=[];
function index(i,j)
{
  if(i<0||j<0||i>rows-1||j>cols-1)
    {
      return -1;
    }
  return j+i*cols;
}
function cell(i,j)
{
  this.i=i;
  this.j=j;
  this.walls=[true,true,true,true];
  this.show=function()
  {
    var x=this.i*size;
    var y=this.j*size;
    stroke(50);
    if(this.walls[0])
       line(x,y,x+size,y);
    if(this.walls[1])
       line(x+size,y,x+size,y+size);
    if(this.walls[2])
        line(x+size,y+size,x,y+size);
    if(this.walls[3])
       line(x,y+size,x,y);
    if(this.visited)
      {
        noStroke();
        fill(255,238,173);
        rect(x,y,size,size);
      }
  }
  this.highlight=function()
  {
    var x=this.i*size;
    var y=this.j*size;
    noStroke();
    fill(255);
    rect(x,y,size,size);
  }
  this.checkNeighbors=function()
  {
    var neighbors=[];
    var top=grid[index(i-1,j)];
    var right=grid[index(i,j+1)];
    var bottom=grid[index(i+1,j)];
    var left=grid[index(i,j-1)];
    if(top&&!top.visited)
      neighbors.push(top);
    if(right&&!right.visited)
      neighbors.push(right);
    if(bottom&&!bottom.visited)
      neighbors.push(bottom);
    if(left&&!left.visited)
      neighbors.push(left);
    if(neighbors.length>0)
      {
        var r=floor(random(0,neighbors.length));
        return neighbors[r];
      }
    else
      {
       return undefined;
      }
  }
}
function removeWalls(a,b)
{
  var x=a.i-b.i;
  if(x==-1)
    {
      a.walls[1]=false;
      b.walls[3]=false;
    }
   if(x==1)
    {
      a.walls[3]=false;
      b.walls[1]=false;
    }
  var y=a.j-b.j;
  if(y==-1)
    {
      a.walls[2]=false;
      b.walls[0]=false;
    }
  if(y==1)
    {
      a.walls[0]=false;
      b.walls[2]=false;
    }
}
function setup() {

  createCanvas(800,800);
  cols=floor(width/size);
  rows=floor(height/size);
  frameRate(5);
  for(var i=0;i<rows;i++)
    {
       for(var j=0;j<cols;j++)
         {
           var c=new cell(i,j);
           grid.push(c);
         }
    }
  current=grid[0];
  current.visited=true;

}

function draw() {
  background(200);
  cnv=createCanvas(400,400);
    var p = (windowWidth - width) / 2;
  var q = (windowHeight - height) / 2;
  cnv.position(p, q);
  for(var i=0;i<grid.length;i++)
    {
      grid[i].show();
    }
 var next=current.checkNeighbors();
    if(next)
      {
        next.visited=true;
        stack.push(current);
        removeWalls(current,next);
        current=next;
      }
    else if(stack.length>0)
    {
      current=stack.pop();
    }
  current.highlight();
}
