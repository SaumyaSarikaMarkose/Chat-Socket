// import { TestBed } from '@angular/core/testing';

// import { ChatService } from './chat.service';

// describe('ChatService', () => {
//   let service: ChatService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(ChatService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { Socket } from 'ngx-socket-io';

// Mock implementation of the Socket service
class MockSocket {
  emit(event: string, data?: any) {
    // You can implement any mock logic here, e.g., simulate emitting an event
  }

  fromEvent(event: string) {
    return {
      subscribe: (callback: Function) => {
        // Simulate event emission here, if necessary
        if (event === 'private-message') {
          callback({ message: 'Hello' }); // Example data
        }
      }
    };
  }
}

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChatService,
        { provide: Socket, useClass: MockSocket },  // Provide the mock Socket service
      ]
    });
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const socketSpy = spyOn(service['socket'], 'emit');
    service.register('testUser');
    expect(socketSpy).toHaveBeenCalledWith('register', 'testUser');
  });

  // Add more tests as necessary
});
