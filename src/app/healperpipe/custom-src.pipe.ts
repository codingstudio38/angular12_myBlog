import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from "@angular/platform-browser";
@Pipe({
  name: 'customSrc'
})
export class CustomSrcPipe implements PipeTransform {
constructor(private sanitizer: DomSanitizer) {

}
  transform(value: any, ...args: unknown[]): unknown {
    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

} 
