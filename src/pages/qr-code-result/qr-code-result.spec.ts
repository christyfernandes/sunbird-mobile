import 'jest';
import {QrCodeResultPage} from './qr-code-result';
import { mockRes } from './qr-code-result.spec.data';
import {
    navCtrlMock,
    navParamsMock,
    contentServiceMock,
    zoneMock,
    translateServiceMock,
    platformMock,
    telemetryGeneratorServiceMock,
    appGlobalServiceMock,
    formAndFrameworkUtilMock,
    profileServiceMock,
    eventsMock,
    preferencesMock,
    popoverCtrlMock,
    commonUtilServiceMock

} from '../../__tests__/mocks';

describe('QrCodeResultPage component', () => {
    let qrCodeResultPage : QrCodeResultPage;

    beforeEach(() => {
        qrCodeResultPage = new QrCodeResultPage(navCtrlMock as any,
            navParamsMock as any,
            contentServiceMock as any,
            zoneMock as any,
            translateServiceMock as any,
            platformMock as any,
            telemetryGeneratorServiceMock as any,
            appGlobalServiceMock as any,
            formAndFrameworkUtilMock as any,
            profileServiceMock as any,
            eventsMock as any,
            preferencesMock as any,
            popoverCtrlMock as any,
            commonUtilServiceMock as any);
    });

    it('should create a valid instance of QrCodeResultPage', () => {
        expect(qrCodeResultPage).not.toBeFalsy();
    });

    // it('Should get parent from nav parameters', () => {
    //     navParamsMock.get.mockReturnValue(mockRes.getChildContentAPIResponse);
    //     spyOn(QrCodeResultPage, 'getChildContents').and.stub();
    // });
});

