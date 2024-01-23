import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';

describe('PaymentsController', () => {
  let controller: PaymentsController;

  let statusResponseMock = {
    send: jest.fn((x) => x),
  };
  let requestMock = {
    query: {},
  } as unknown as Request;
  let responseMock = {
    status: jest.fn((x) => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPayments', () => {
    it('should return a status 400', () => {
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenLastCalledWith({
        msg: 'Missing count or page query parameter',
      });
    });

    it('should return a status of 200 when the query params are present', () => {
      requestMock.query = {
        count: '20',
        page: '2',
      };
      controller.getPayments(requestMock, responseMock);
      expect(responseMock.send).toHaveBeenCalledWith(200);
    });
  });
});
