import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnChanges {
  @Input() comment: string;
  comments: any[];
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
      this.comments = this.getComments();
  }

  getComments(): any[] {
    if (!this.comment) return [];
    let source = this.comment;
    source = this.escapeHtml(source);
    source = 
      "<N>"
      +source
      .replace("[spoiler]","</N><X>")
      .replace("[/spoiler]","</X><N>")
      +"</N>"
    let sourcearray = source.split("><");
    let mappedarray = sourcearray.map((v,i)=>{
      if (i!=0) v = "<"+v;
      if (i!=sourcearray.length-1) v+=">";
      return v;
    });

    return mappedarray.map(v => {
      if (v.charAt(1)==='X') return {type:'spoiler',content:this.unescapeHtml(v.substr(3,v.length-3-4))}
      else                   return {type:'normal' ,content:this.unescapeHtml(v.substr(3,v.length-3-4))}
    })
  }

  escapeHtml(unsafe) {
    return unsafe
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;");
 }
 unescapeHtml(unsafe) {
   return unsafe
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}
}
