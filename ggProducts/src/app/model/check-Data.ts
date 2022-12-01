import { Observable } from 'rxjs';

export declare interface CheckDataComponent {
  canDeactivate: () => boolean | Observable<boolean>;
}
