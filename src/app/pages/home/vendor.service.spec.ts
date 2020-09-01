import { Type } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule } from '@core';
import { VendorService } from './vendor.service';

describe('VendorService', () => {
  let vendorService: VendorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [VendorService],
    });

    vendorService = TestBed.inject(VendorService);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('Read', () => {
    it('should return show all vendors', () => {
      // Arrange
      const mockVendor = { value: 'show all vendors' };

      // Act
      const randomVendorSubscription = vendorService.Read({ data: 'toto' });

      // Assert
      randomVendorSubscription.subscribe((vendor: string) => {
        expect(vendor).toEqual(mockVendor.value);
      });
      httpMock.expectOne({}).flush(mockVendor);
    });

    it('should return a string in case of error', () => {
      // Act
      const randomVendorSubscription = vendorService.Read({ data: 'toto' });

      // Assert
      randomVendorSubscription.subscribe((vendor: string) => {
        expect(typeof vendor).toEqual('string');
        expect(vendor).toContain('Error');
      });
      httpMock.expectOne({}).flush(null, {
        status: 500,
        statusText: 'error',
      });
    });
  });
});
