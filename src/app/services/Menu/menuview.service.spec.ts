import { TestBed } from '@angular/core/testing';

import { MenuviewService } from './menuview.service';

describe('MenuviewService', () => {
  let service: MenuviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
