const STORAGE_KEY = 'warehouseShipments';
let refreshInventory = null;
let refreshActivity = null;
let inventoryData = [];
let activityData = [];
let inMemoryShipmentStore = [];

const PLATE_TRUCKER_REFERENCE = [
  ['30807', 'G888'],
  ['AAJ-5410', 'CHIVA'],
  ['AAO-5050', 'JAMDI'],
  ['AAQ-8536', 'DV MOVERS'],
  ['AAR-2116', 'DV MOVERS'],
  ['AAV-6612', 'DV MOVERS'],
  ['ABB-6613', 'MAE'],
  ['ABB-6637', 'EGAY'],
  ['ABJ-8690', 'ALGEM'],
  ['ABJ-9388', 'ALGEM'],
  ['ABK-2664', 'DV MOVERS'],
  ['ABL-1606', 'TRAUCKLANE'],
  ['ABL-1607', 'CLIENT'],
  ['UYC-458', 'ATI'],
  ['ADH-2677', 'EGAY'],
  ['ADK-3126', 'EGAY'],
  ['AFA-6597', 'DV MOVERS'],
  ['AFA-8744', 'ALGEM'],
  ['ALA-7400', 'EGAY'],
  ['ALA-7866', 'TRAUCKLANE'],
  ['AMA-1220', 'ALGEM'],
  ['CCE-9369', 'TMS'],
  ['AMA-1348', 'EGAY'],
  ['AMA-2550', 'SETH CARGO'],
  ['AT-305', 'CLIENT'],
  ['AWA-3652', 'JAMDI'],
  ['AWA-7756', 'DV MOVERS'],
  ['CAA-6682', 'JAMDI'],
  ['CAC 8982', 'ALGEM'],
  ['CAC-1620', 'TRUCKLINE'],
  ['CAC-1815', 'MC ANDREI'],
  ['CAC-8662', 'ATI'],
  ['CAC-8960', 'MIJODA'],
  ['CAC-8982', 'ALGEM'],
  ['CAC-9773', 'MAE'],
  ['CAD-1448', 'ALGEM'],
  ['CAD-2191', 'ALGEM'],
  ['CAD-2798', 'TRAUCKLANE'],
  ['CAD-7548', 'TRAUCKLANE'],
  ['CAD-7598', 'TRAUCKLANE'],
  ['CAD-7877', 'MIJODA'],
  ['CAE-1795', 'ULTIMATE'],
  ['CAE-2788', 'EGAY'],
  ['CAH-1972', 'ULTIMATE'],
  ['CAH-2667', 'GINNEL'],
  ['CAH-2724', 'RONAFLOR'],
  ['CAH-4187', 'KREXIM'],
  ['CAH-4789', 'JAMDI'],
  ['CAH-7241', 'ALGEM'],
  ['CAI-4789', 'JAMDI'],
  ['CAJ-7254', 'ALGEM'],
  ['CAK-4453', 'ULTIMATE'],
  ['CAK-9023', 'SETH CARGO'],
  ['CAK-9053', 'SETH CARGO'],
  ['CAM-7883', 'J.LIONGSON'],
  ['CAN-7877', 'MIJODA'],
  ['CAN-8929', 'J.LIONGSON'],
  ['CAO-5257', 'CAB'],
  ['CAS-9431', 'SETH CARGO'],
  ['CBA-2315', 'BOGART'],
  ['CBB-1961', 'CLIENT'],
  ['DAH-2236', 'MURIEL'],
  ['CBE-5620', 'TRUCKLANE'],
  ['CBF-2436', 'TRUCKLANE'],
  ['CBF-3499', 'TRAUCKLANE'],
  ['CBF-4127', 'GQB'],
  ['CBF-5620', 'TRUCKLANE'],
  ['CBF-6620', 'TRUCKLANE'],
  ['CBF-8620', 'TRAUCKLANE'],
  ['CBG-6801', 'DV MOVERS'],
  ['CBI-7036', 'SHIPPER'],
  ['CBJ-7058', 'PMTC'],
  ['CBJ-9232', 'EGAY'],
  ['CBN-1697', 'EGAY'],
  ['CBN-1698', 'EGAY'],
  ['CBN-1699', 'EGAY'],
  ['CBN-2096', 'EGAY'],
  ['CBN-5509', 'MIJODA'],
  ['CBN-6918', 'ATLJ'],
  ['CBN-9456', 'ATLJ'],
  ['CBP-7193', 'MIJODA'],
  ['CBP-7987', 'PMI'],
  ['CBP-8091', 'CLIENT'],
  ['CBP-8142', 'MAE'],
  ['CBP-9928', 'J.LIONGSON'],
  ['CBQ-1958', 'TRUCKLANE'],
  ['CBQ-2774', 'TRUCKLANE'],
  ['CBQ-6119', 'ATLJ'],
  ['CBQ-6985', 'ATLJ'],
  ['CBQ-7883', 'MIJODA'],
  ['CBR-2239', 'GO SANTOS'],
  ['CBR-2478', 'ONIX'],
  ['CBR-8048', 'TRUCKLANE'],
  ['CBR-8084', 'TRAUCKLANE'],
  ['CBR-9022', 'GO SANTOS'],
  ['CBS-5373', 'PMTC'],
  ['CBS-6778', 'MAE'],
  ['CBS-7953', 'TRUCKLANE'],
  ['CBZ-9232', 'EGAY'],
  ['CCE-2471', 'BOGART'],
  ['CCN-2457', 'ALGEM'],
  ['CCN-2545', 'MANLAPAT'],
  ['CCO-1262', 'S.C.M.'],
  ['CCO-5688', 'MIJODA'],
  ['CCO-8885', 'ALGEM'],
  ['CDK-2995', 'TRUCKLANE'],
  ['CDK-4240', 'ULTIMATE'],
  ['CDK-4251', 'ABST'],
  ['CXE-205', 'MC ANDREI'],
  ['D3X-065', 'MARU'],
  ['DAC-7502', 'TMS'],
  ['DAH-3235', 'MURIEL'],
  ['DAH-3236', 'MURIEL'],
  ['DBI-7126', 'TRAUCKLANE'],
  ['DBI-7162', 'TRUCKLANE'],
  ['DIL-546', 'ULTIMATE'],
  ['ETW-776', 'EGAY'],
  ['HCL-9211', 'DECENA'],
  ['JAK-2350', 'ALGEM'],
  ['MVV-222', 'SHIPPER'],
  ['NAD-3222', 'MURIEL'],
  ['NAD-6378', 'G888'],
  ['NAD-6578', 'GINNEL'],
  ['NAE-4046', 'EGAY'],
  ['NAE-4192', 'ATI'],
  ['NAH-7241', 'ALGEM'],
  ['NAH-7439', 'ALGEM'],
  ['NAI-7865', 'GAPUZAN'],
  ['NAJ-1843', 'JAMDI'],
  ['NAJ-4409', 'DV MOVERS'],
  ['NAJ-6421', 'ALGEM'],
  ['NAK-9464', 'EGAY'],
  ['NAO-3575', 'SUNMARCUS'],
  ['NAP-1887', 'EGAY'],
  ['NAP-6609', 'ATLJ'],
  ['NAQ-3299', 'NEWTOP'],
  ['NAQ-4023', 'EGAY'],
  ['NAQ-7186', 'MURIEL'],
  ['NAQ-9139', 'ALMALEEN'],
  ['NAR-2707', 'EGAY'],
  ['NAR-2709', 'EGAY'],
  ['NAR-2730', 'INTEGRAL'],
  ['NAR-4980', 'MIJODA'],
  ['NAR-5046', 'DV MOVERS'],
  ['NAU-7409', 'BDP'],
  ['NAU-7941', 'GAPUZAN'],
  ['NAU-7945', 'GAPUZAN'],
  ['NAV-1917', 'NEWTOP'],
  ['NAV-7260', 'STS'],
  ['NAX-1203', 'MARU'],
  ['NAW-7062', 'ULTIMATE'],
  ['NBB-3980', 'JUGRO'],
  ['NBB-5223', 'SETH'],
  ['NBB-7639', 'EGAY'],
  ['NBB-7643', 'ATLJ'],
  ['NBC-6133', 'TRANSPORTIFY'],
  ['NBC-8029', 'GAPUZAN'],
  ['NBE-4951', 'CHIBA'],
  ['NBF-3607', 'TRAUCKLANE'],
  ['NBG-3917', 'EGAY'],
  ['NBG-3953', 'EGAY'],
  ['NBJ-6777', 'EGAY'],
  ['NBM-3792', 'EGAY'],
  ['NBM-8212', 'MIJODA'],
  ['NBM-9807', 'EGAY'],
  ['NBM-9808', 'EGAY'],
  ['NBN-1050', 'EGAY'],
  ['NBN-3792', 'EGAY'],
  ['NBQ-7273', 'DV MOVERS'],
  ['NBQ-7403', 'DV MOVERS'],
  ['NBQ-7980', 'TRUCKLANE'],
  ['NBQ-7986', 'PMTC'],
  ['CDR-2995', 'TRUCKLANE'],
  ['NBR-5007', 'BICP'],
  ['NBR-8927', 'EGAY'],
  ['NBR-9426', 'PMI'],
  ['NBS-7953', 'TRUCKLANE'],
  ['NBZ-5256', 'G888'],
  ['NBZ-5657', 'RONAFLOR'],
  ['NBZ-9720', 'G888'],
  ['NCB-5256', 'G888'],
  ['NCK-2430', 'MAE'],
  ['NCK-3168', 'TRUCKLANE'],
  ['NCK-3245', 'BOGART'],
  ['NCK-6336', 'ALGEM'],
  ['NCK-6516', 'DV MOVERS'],
  ['NCK-6944', 'ULTIMATE'],
  ['NCK-7455', 'ALGEM'],
  ['NCL-9211', 'DV MOVERS'],
  ['NCN-9253', 'TRUCKLANE'],
  ['NCO-1430', 'TRAUCKLANE'],
  ['NCS-1382', 'GAPUZAN'],
  ['NCV-7941', 'TRUCKLANE'],
  ['NCV-9741', 'TRAUCKLANE'],
  ['NDB-8875', 'EGAY'],
  ['NDB-8895', 'EGAY'],
  ['NDC-4848', 'BEST FREIGHT'],
  ['NDG-1785', 'DV MOVERS'],
  ['ADH-2674', 'EGAY'],
  ['NDI-7026', 'STS'],
  ['NDI-7166', 'TRUCKLANE'],
  ['NDJ-4589', 'EGAY'],
  ['NDJ-9232', 'EGAY'],
  ['NDK-1944', 'EGAY'],
  ['NDU-5000', 'EGAY'],
  ['NDU-5002', 'EGAY'],
  ['NEC-9153', 'ATLJ'],
  ['NEG-4162', 'NEWTOP'],
  ['NEG-4743', 'ATLJ'],
  ['NEG-4753', 'ATLJ'],
  ['NEG-9153', 'ATLJ'],
  ['NEM-3697', 'GINNEL'],
  ['NEM-4422', 'BOGART'],
  ['NEN-6819', 'EGAY'],
  ['NEN-6820', 'EGAY'],
  ['NEO-3374', 'ONIX'],
  ['ABH-3050', 'ULTIMATE'],
  ['NEO-7876', 'GQB'],
  ['NEP-1276', 'NEWTOP'],
  ['NEP-2906', 'DV MOVERS'],
  ['NES-1043', 'PMI'],
  ['NET-9124', 'NEWTOP'],
  ['NEW-2791', 'GQB'],
  ['NEW-8894', 'TRAUCKLANE'],
  ['NEW-8994', 'TRUCKLANE'],
  ['NFX-6640', 'MAE'],
  ['NFX-6889', 'ALGEM'],
  ['NFX-6892', 'EGAY'],
  ['NFX-8350', 'PMTC'],
  ['NFY-4528', 'STS'],
  ['NFY-8065', 'EGAY'],
  ['NFY-9696', 'PMTC'],
  ['NFY-9700', 'PMTC'],
  ['NGB-1149', 'CAB'],
  ['NGB-4645', 'EGAY'],
  ['NGD-7376', 'GQB'],
  ['NGG-2337', 'ALGEM'],
  ['NGK-7229', 'PMI'],
  ['NGK-9229', 'PMI'],
  ['NGL-7569', 'ATLJ'],
  ['NGP-5119', 'TRUCKLANE'],
  ['NGR-4139', 'COBAN'],
  ['NGR-5080', 'ALGEM'],
  ['NGT-3605', 'DV MOVERS'],
  ['NHA-2546', 'TRUCKLANE'],
  ['NHB-5337', 'BOGART'],
  ['NHD-3641', 'TRUCKLANE'],
  ['NID-331', 'BS KING'],
  ['NIK-3472', 'DECENA'],
  ['NIS-2773', 'ANCORA'],
  ['NNQ-959', 'NEWTOP'],
  ['NQS-328', 'RONAFLOR'],
  ['NTR-8054', 'GAPUZAN'],
  ['NUI-285', 'EGAY'],
  ['NYQ-443', 'EGAY'],
  ['PDO-963', 'GQB'],
  ['PDO-968', 'GQB'],
  ['PEO-326', 'NEWTOP'],
  ['RMF-147', 'TRUCKLANE'],
  ['RMR-639', 'RONAFLOR'],
  ['RND-656', 'EGAY'],
  ['RNG-693', 'CARGO WORTHY'],
  ['RNK-686', 'EGAY'],
  ['TXU-257', 'EGAY'],
  ['TXU-357', 'EGAY'],
  ['TXZ-445', 'EGAY'],
  ['TYE-232', 'GAPUZAN'],
  ['TYE-848', 'DECENA'],
  ['TYE-908', 'DECENA'],
  ['TYE-928', 'DV MOVERS'],
  ['TYE-938', 'DV MOVERS'],
  ['TYF-357', 'DECENA'],
  ['TYF-544', 'DV MOVERS'],
  ['TYF-772', 'DECENA'],
  ['TYG-876', 'GAPUZAN'],
  ['TYK-081', 'EMRP'],
  ['TYK-211', 'GAPUZAN'],
  ['TYK-221', 'GAPUZAN'],
  ['TYK-681', 'EMRD'],
  ['TYP-178', 'DECENA'],
  ['TYP-211', 'GAPUZAN'],
  ['TYP-221', 'GAPUZAN'],
  ['TYP-258', 'DV MOVERS'],
  ['TYP-372', 'DV MOVERS'],
  ['TYP-380', 'DECENA'],
  ['TYR-375', 'GAPUZAN'],
  ['WEO-659', 'AAI TRUCKING'],
  ['TYX-204', 'GAPUZAN'],
  ['TYZ-520', 'JAMDI'],
  ['TYZ-894', 'BS KING'],
  ['UMQ-685', 'EGAY'],
  ['UMW-459', 'EGAY'],
  ['UVA-536', 'EGAY'],
  ['CBR-1882', 'EGAY'],
  ['UVC-501', 'NEWTOP'],
  ['UVD-779', 'GAPUZAN'],
  ['UVD-963', 'COBAN'],
  ['UVK-622', 'JAMDI'],
  ['UVM-412', 'JAMDI'],
  ['UVS-298', 'COBAN'],
  ['UVS-356', 'COBAN'],
  ['UVS-359', 'COBAN'],
  ['UVS-369', 'COBAN'],
  ['UVU-985', 'JAMDI'],
  ['UVV-938', 'JAMDI'],
  ['UVW-523', 'COBAN'],
  ['UVZ-186', 'SETH CARGO'],
  ['UVZ-356', 'COBAN'],
  ['UWE-245', 'SHIPPER'],
  ['UWF-153', 'COBAN'],
  ['UWK-465', 'EGAY'],
  ['UWM-459', 'EGAY'],
  ['UWM-904', 'GAPUZAN'],
  ['UWW-904', 'GAPUZAN'],
  ['UYC-448', 'ATI'],
  ['UYD-933', 'DV MOVERS'],
  ['UYD-943', 'DV MOVERS'],
  ['UYD-995', 'DV MOVERS'],
  ['WAQ-219', 'EGAY'],
  ['WAQ-717', 'ALMALEEN'],
  ['WFZ-229', 'EGAY'],
  ['WIU-982', 'NEWTOP'],
  ['WIV-361', 'EGAY'],
  ['WLQ-320', 'EGAY'],
  ['WMQ-131', 'SETH'],
  ['WNC-262', 'EGAY'],
  ['WPQ-902', 'CLIENT'],
  ['WQC-220', 'ABST'],
  ['WQN-208', 'FUSO'],
  ['XKW-977', 'EGAY'],
  ['XMW-310', 'ALGEM'],
  ['XRY-616', 'ALGEM'],
  ['XSV-687', 'EGAY'],
  ['ZFK-492', 'EGAY'],
  ['ZGL-561', 'EGAY'],
  ['ZST-839', 'MC ANDREI'],
  ['ZTW-776', 'EGAY'],
  ['CAJ-1843', 'JAMDI'],
  ['CBP-9799', 'ULTIMATE'],
  ['TYZ-510', 'JAMDI'],
  ['DDV-7162', 'GAPUZAN'],
  ['TYF-123', 'GAPUZAN'],
  ['NAP-5859', 'INTEGRAL'],
  ['CCE-2902', 'M.L.F.'],
  ['AAY-2030', 'JAMDI'],
  ['NDI-7144', 'TRUCKLANE'],
  ['NAQ-3975', 'TRUCKLANE'],
  ['NEW-2685', 'SUN MARCUS'],
  ['UVD-979', 'GAPUZAN'],
  ['ABB-6114', 'ALMALEEN'],
  ['UVX-186', 'SETH CARGO'],
  ['UWH-677', 'GAPUZAN'],
  ['CBQ-4093', 'MLF'],
  ['UPI-325', 'SHIPPER'],
  ['NHV-1270', 'DHL'],
  ['NAU-7944', 'GAPUZAN'],
  ['TYF-232', 'GAPUZAN'],
  ['CCC-5926', 'STRIPPER'],
  ['DAH-3138', 'MURIEL'],
  ['CBG-2774', 'TRUCKLANE'],
  ['DBI-7167', 'TRUCKLANE'],
  ['CBA-2580', 'ATLJ'],
  ['CBF-7482', 'TRUCKLANE'],
  ['NGX-3884', 'GQB'],
  ['NGS-2145', 'P.M.I.'],
  ['NCJ-1382', 'GAPUZAN'],
  ['NGR-4423', 'ATLJ'],
  ['NHB-8337', 'BOGART'],
  ['CBF-4143', 'ATLJ'],
  ['CBR-8648', ''],
  ['030807', 'G888'],
  ['CAM-7885', 'KIVMAR'],
  ['NAG-1643', 'JAMDI'],
  ['NAH-3136', 'EGAY'],
  ['AAQ-9039', 'EGAY'],
  ['NFX-9694', 'TRUCKLANE'],
  ['NAQ-3976', 'TRUCKLANE'],
  ['NBT-8348', 'ULTIMATE'],
  ['NAW-9773', 'SUN MARCUS'],
  ['WRO-204', 'KREXIM'],
  ['CAE-5939', 'JAMDI'],
  ['AAQ-5050', 'JAMDI'],
  ['UVW-527', 'COBAN'],
  ['CBD-4193', 'CEVA'],
  ['NBM-6795', 'AAI'],
  ['ABG-7009', 'GAPUZAN'],
  ['ZFR-454', 'EGAY'],
  ['NEO-1430', 'TRUCKLANE'],
  ['CCR-2009', 'KEVMAR'],
  ['DAH-3135', 'MURIEL'],
  ['NAQ-3977', 'TRUCKLANE'],
  ['NGG-6605', 'CLIENT'],
  ['TQX-299', 'DELA PAZ'],
  ['DAE-8915', 'AAI TRUCKING'],
  ['NBM-6745', 'AAI TRUCKING'],
  ['MAU-5634', 'AAI TRUCKING'],
  ['POL-637', 'AAI TRUCKING'],
  ['NAT-8611', 'FUENTES TRUCKING'],
  ['NBM-6748', 'AAI TRUCKING'],
  ['NAT-861', 'AAI TRUCKING'],
  ['NIR-8054', 'GAPUZAN'],
  ['TYX-221', 'GAPUZAN'],
  ['NGT-9167', 'JAMDI'],
  ['CCE-5295', 'TRUCKLANE'],
  ['NAP-5257', 'INTEGRAL'],
  ['NEG-1673', 'ALGEM'],
  ['AFA-8743', 'ALGEM'],
  ['TQY-299', 'AAI TRUCKING'],
  ['NDY-5107', 'AEROMAX'],
  ['CCE-5377', 'TMS'],
  ['NCK6333', 'ALGEM'],
  ['WIX-301', 'SUN MARCUS'],
  ['AFA-8730', 'ALMALEEN'],
  ['CAZ-4737', 'SHIPPER'],
  ['UVX-973', 'JAMDI'],
  ['ACA-4666', 'AEROMAX'],
  ['NGR-3248', 'EGAY'],
  ['NBC-9841', 'TRUCK COM'],
  ['NBS-2158', 'TST TRUCKING'],
  ['CCE-9377', 'TRUCKLANE'],
  ['AVA-2004', 'AAI TRUCKING'],
  ['CAK-3664', 'JAMDI'],
  ['UVZ-536', 'EGAY'],
  ['NAU-7409', 'CEVA'],
  ['NBM-6785', 'AAI TRUCKING'],
  ['CAH-1989', 'KREXIM'],
  ['CBP-5620', 'TMS'],
  ['CAN-2069', 'KEVMAR'],
  ['NCK-1895', 'AAI TRUCKING'],
  ['CAL-7977', 'AAI TRUCKING'],
  ['CBK-5620', 'TMS'],
  ['AAQ-9139', 'ALMALEEN'],
  ['NEO-2642', 'SANTE'],
  ['RJL-115', 'ALMALEEN'],
  ['CAF-8456', 'EMRD'],
  ['ALL-7866', 'TMS'],
  ['CAD-4193', 'RDP'],
  ['DAM-5360', 'SHIPPER'],
  ['NBR-4731', 'EGAY'],
  ['CBQ-6660', 'FAV'],
  ['CBP-5070', 'MIJODA'],
  ['CCK-9185', 'ALMALEEN'],
  ['CAC-7771', 'MIJODA'],
  ['NCK-6333', 'ALGEM'],
  ['CNC-663', 'ALMALEEN'],
  ['RNC-663', 'ATI'],
  ['TLO-766', 'INLAND'],
  ['CCN-6518', 'MIJODA'],
  ['WAQ-917', 'ATI'],
  ['NDH-9816', 'MAETS'],
  ['TKQ-798', 'IN LAND'],
  ['NAV-1896', 'ATI'],
  ['UWQ-131', 'SETH'],
  ['NCK-9184', 'SUNMARCUS'],
  ['DAG-7210', 'BICP'],
  ['DAD-7690', 'INLAND'],
  ['NCK-7229', 'PMI'],
  ['NGP-3119', 'TMS'],
  ['CCK-7740', 'G888'],
  ['TLC-766', 'INLAND'],
  ['TLO-776', 'INLAND'],
  ['NAN-3034', 'STS'],
  ['NIE-1414', 'EGAY'],
  ['NAT-5713', 'FAV'],
  ['NCF-1895', 'AAI TRUCKING'],
  ['NBY-4321', 'STS'],
  ['CBF-7987', 'PMI'],
  ['CBS-7828', 'KEVMAR'],
  ['CAG-5677', 'ATI'],
  ['VIQ-933', 'DECENA'],
  ['DAH-7169', 'IN LAND'],
  ['NAP-8617', 'AAI TRUCKING'],
  ['CCO-9660', 'MIJODA'],
  ['NAJ-5713', 'STS'],
  ['WIV-301', 'SUN MARCUS'],
  ['NFX-6842', 'EGAY'],
  ['NAU-7942', 'GAPUZAN'],
  ['CBD-7987', 'PMI'],
  ['NAU-7943', 'GAPUZAN'],
  ['NCK-9699', 'STS'],
  ['NEPO-7876', 'GQB'],
  ['NAP-1770', 'AEROMAX'],
  ['CBD-7193', 'MIJODA'],
  ['CBG-9232', 'EGAY'],
  ['CBQ-2601', 'KEVNAR'],
  ['TYE-544', 'DV MOVERS'],
  ['CCK-8494', 'BS KING'],
  ['CAE-5439', 'JAMDI'],
  ['NBB-3980', 'JUGRO'],
  ['NEP-3257', 'MBC'],
  ['CBF-349', 'TMS'],
  ['CAG-5077', 'ATI'],
  ['NAQ-2730', 'INTEGRAL'],
  ['NDH-3275', 'ALMALEEN'],
  ['NEF-2473', 'BDP'],
  ['NGB-3917', 'EGAY'],
  ['NCW-4232', 'INLAND'],
  ['NAR-273', 'INTEGRAL'],
  ['CAC-1813', 'MC ANDRIE'],
  ['AVA-2001', 'AAI TRUCKING'],
  ['CBJ-4376', 'ALGEM'],
  ['NBY-4318', 'BTS'],
  ['UBC-9841', 'TRUCK COM'],
  ['NAT-9124', 'NEWTOP'],
  ['NEO-659', 'AAI TRUCKING'],
  ['AAT-1980', 'NIPPON'],
  ['NDN-7255', 'FAV'],
  ['CAF-4153', 'JAMDI'],
  ['CAE-4789', 'JAMDI'],
  ['ABG-5507', 'AEROMAX'],
  ['NFX-6632', 'EGAY'],
  ['NEO-656', 'AAI TRUCKING'],
  ['NET-1924', 'NEWTOP'],
  ['CBN-1698', 'EGAY'],
  ['UVZ-523', 'COBAN'],
  ['CBA-2318', 'BOGART'],
  ['CPP-8408', 'MLF'],
  ['DAH-3234', 'MURIEL'],
  ['CCO-5834', 'MIJODA'],
  ['CAU-2237', 'ACE STAR'],
  ['NDN-7567', 'PMTC'],
  ['NAQ-7186', 'MURIEL'],
  ['DBR-5208', 'LALAMOVE'],
  ['CEO-1262', 'SGM'],
  ['CDK-4595', 'JAMDI'],
  ['NAQ-7180', 'MURIEL'],
  ['NAP-7464', 'PMTC'],
  ['NCE-2405', 'MAE'],
  ['NFY-6892', 'EGAY'],
  ['CBQ-2446', 'ALGEM'],
  ['NDF-6877', 'AAI TRUCKING'],
  ['NAG-9092', 'AAI TRUCKING'],
  ['NAD-5859', 'INTEGRAL'],
  ['NGT-2016', 'EXACT CARGO'],
  ['CGK-9965', 'STS'],
  ['CAA-6681', 'JAMDI'],
  ['NDM-3040', 'FAV'],
  ['NDS-4589', 'EGAY'],
  ['NAX-1339', 'CLIENT'],
  ['TLO-812', 'FAST INFO'],
  ['NHJ-2370', 'LALAMOVE'],
  ['NDJ-818', 'SUN MARCUS'],
  ['NBI-4321', 'STS'],
  ['ABB-3272', 'AAI TRUCKING'],
  ['CCP-4463', 'EGAY'],
  ['NBZ-9730', 'G888'],
  ['CCP-4797', 'BS KING'],
  ['CAN-4530', 'KEVNAR'],
  ['NAD-3223', 'MURIEL'],
  ['CAJ-9296', 'SETH CARGO'],
  ['CAG-5277', 'ALMALEEN'],
  ['ABK-6481', 'DV MOVERS'],
  ['ADH-3276', 'ATI'],
  ['CAC-9773', 'MAE'],
  ['CBS-6961', 'PMTC'],
  ['AAB-6612', 'DECENA'],
  ['CBA-2315', 'BOGART'],
  ['CCK-9965', 'STS'],
  ['CCK-7740', 'BOGART'],
  ['NAG-1643', 'JAMDI'],
  ['CCP-8708', 'MLF'],
  ['CBB-1961', 'KEVMAR'],
  ['CCR-5168', 'BOGART'],
  ['NAO-9910', 'SHIPPER'],
  ['NAX-1339', 'KEYSTONE'],
  ['NBB-3398', 'NK RIVERA'],
  ['GAN-4167', 'CLIENT'],
  ['NCK-2805', 'SHIPPER'],
  ['CCP-8408', 'MLF'],
  ['NAP-6578', 'G888'],
  ['NCK-2405', 'MAE'],
  ['CCK-7431', 'INTEGRAL'],
  ['ADH-2476', 'EGAY'],
  ['TYP-315', 'DECENA'],
  ['NCB-9232', 'DECENA'],
  ['NBB-5223', 'SETH CARGO'],
  ['CCE-2471', 'BOGART'],
  ['CAO-8872', 'J. LIONSONG'],
  ['JAU-8814', 'G.Q.B'],
  ['CAD-9431', 'SETH CARGO'],
  ['NAQ-6045', 'RRP'],
  ['CCO-1262', 'SETH CARGO'],
  ['UXX-973', 'SHIPPER'],
  ['NFY-5853', 'SHIPPER'],
  ['CCR-1218', 'CLIENT'],
  ['NAX-9232', 'INLAND'],
  ['NDF-6577', 'AAI'],
  ['AAT-4210', 'JAMDI'],
  ['CCR-5136', 'CLIENT'],
  ['ZBQ-2601', 'CLIENT'],
  ['CBP-3265', 'CLIENT'],
  ['NGK-1097', 'CLIENT'],
  ['NDJ-4689', 'CLEINT'],
  ['UWG-114', 'CLIENT'],
  ['NEG-2873', 'MIJODA'],
  ['NCW-4240', 'RGB'],
  ['NDI-6877', 'AAI TRUCKING'],
  ['CCP-7917', 'TMS'],
  ['CCR-7883', 'J.LIONGSON'],
  ['CCR-8404', 'J.CASTINO'],
  ['NAH-3126', 'EGAY'],
  ['TLO766', 'INLAND'],
  ['CBJ-4728', 'ACE STAR'],
  ['NBG-4645', 'EGAY'],
  ['CCP-6615', 'ALGEM'],
  ['CBJ-7828', 'EM PAGSIBINGAN'],
  ['CAH-8929', 'EM PAGSIBINGAN'],
  ['UJI-603', 'STM'],
  ['CAX-2239', 'ACE STAR'],
  ['MAY--2344', ''],
  ['NDU-4589', 'EGAY'],
  ['DAN-4972', 'ULTIMATE'],
  ['CAS-9296', 'S.C.M'],
  ['CCP-7945', 'ALL SHIP'],
  ['AAO-5050', 'JAMDI'],
  ['CCF-1218', 'CLIENT'],
  ['CHC-9773', 'MAET'],
  ['CBP-1891', 'KEVNAR'],
  ['CBN-9691', 'ACE STAR'],
  ['CCR-1452', 'BS KING'],
  ['NBB-5003', 'SETH CARGO'],
  ['WIX-225', 'BCC TRUCKING'],
  ['NGJ-8431', 'AAI TRUCKING'],
  ['JBH-9219', 'G.Q.B'],
  ['NBM-6245', 'STM'],
  ['CBJ-5373', 'PMTC'],
  ['NBB-7639', 'EGAY'],
  ['CBR-2492', 'PMTC'],
  ['NDE-4192', 'A.T.I'],
  ['NAP-6252', 'MARU888'],
  ['NDJ-6592', 'EGAY'],
  ['CCP-8024', 'TRUCKLANE'],
  ['NAD-6876', 'GINNEL'],
  ['CBG-6985', 'ATLJ'],
  ['NEO-7878', 'GQB'],
  ['CBB-7987', 'PMI'],
  ['MAS-9224', 'HANKYU'],
  ['JAL-1115', 'ATLJ'],
  ['CCD-8885', 'ALGEM'],
  ['CCN-8586', 'ATLJ'],
  ['CCP-5575', 'ATLJ'],
  ['CCE-6377', 'PMTC'],
  ['NDL-2092', 'EGAY'],
  ['CCP-6395', 'SETH CARGO'],
  ['CBQ-6119', 'ATLJ'],
  ['CAO-3287', 'J.LIONGSON'],
  ['CDD-2879', 'PIERRE MICO'],
  ['CCR-1625', 'PMTC'],
  ['CBS-7475', 'PMTC'],
  ['NCK-7455', 'ALGEM'],
  ['NLE-8890', 'BDP'],
  ['NGP-1536', 'ACESTAR'],
  ['UVD-869', 'COBAN'],
  ['NDX-2670', 'EGAY'],
  ['CBQ-4407', ''],
  ['CBP-2365', 'PAGSIBIGAN'],
  ['NAZ-1429', 'AAI TRUCKING'],
  ['NLE-5890', 'QUICK TULES'],
  ['CCN-5595', 'BCC TRUCKING']
];

const createPlateTruckerIndex = () => {
  const index = new Map();
  PLATE_TRUCKER_REFERENCE.forEach(([plate, trucker]) => {
    const normalizedPlate = String(plate || '').trim().toUpperCase().replace(/\s+/g, '');
    const normalizedTrucker = String(trucker || '').trim();
    if (!normalizedPlate || !normalizedTrucker) {
      return;
    }
    if (!index.has(normalizedPlate)) {
      index.set(normalizedPlate, normalizedTrucker);
    }
  });
  return index;
};

const PLATE_TRUCKER_INDEX = createPlateTruckerIndex();

const TEXT_FIELD_SUGGESTIONS = {
  receivedBy: ['AIVAN', 'DAN', 'RANDY', 'JULIUS', 'JESS', 'JOBERT', 'JOSEPH', 'LORENZO', 'ROY', 'RALPH', 'ROBERTO'],
  releasedBy: ['AIVAN', 'DAN', 'RANDY', 'JULIUS', 'JESS', 'JOBERT', 'JOSEPH', 'LORENZO', 'ROY', 'RALPH', 'ROBERTO'],
  cargoCondition: [
    'GOOD',
    'DAMAGED PALLET',
    'MINOR DENT',
    'SCRATCH ON OUTER PACKAGE BUT ACCEPTABLE',
    'SLIGHTLY DENTED BUT ACCEPTABLE',
    'WITH DENT BUT STILL ACCEPTABLE',
    'WITH HOLES',
    'WITH SCRATCHES',
    'RETURN',
    'DAMAGED PALLET BUT ACCEPTABLE',
    'TORN',
    'LOOSE STRAP',
    'WET CARTON',
    'DENTED BUT ACCEPTABLE',
    'SLIGHTLY DENTED',
    'CHIP OUT',
    'DENTED',
    'SCRATCH',
    'BROKEN PALLET BUT CARGO STILL IN GOOD CONDITION',
    'COLLAPSED PALLETS',
    'DAMAGED (FOR BO REPORT)',
    'RE-USED BOX BUT ACCEPTABLE',
    'RE-ICING',
    'TORN & DENTED BUT ACCEPTABLE',
    'WITH B.O REPORT',
    'B.O TO FOLLOW',
    'OPEN & DENTED NO B.O REPORT',
    'MINOR DENT BUT ACCEPTABLE',
    'MINOR SCRATCH',
    'PROCEED BY CS',
    'WITH TAPE',
    'RE-USED PLT',
    'RETAPE',
    'RE-USED PACKAGE BUT ACCEPTABLE',
    'SUBJECT FOR SURVEY',
    'SHOCK WATCH RED'
  ],
  location: (() => {
    const racks = ['A', 'B', 'C', 'D'];
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const cols = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'];
    const suggestions = [];

    racks.forEach((rack) => {
      rows.forEach((row) => {
        cols.forEach((col) => {
          suggestions.push(`RACK ${rack} ${row}${col}${row}`);
        });
      });
    });

    return suggestions;
  })()
};

const getPlateSuggestions = (query) => {
  const normalizedQuery = String(query || '').trim().toUpperCase().replace(/\s+/g, '');

  const suggestions = [];
  PLATE_TRUCKER_INDEX.forEach((trucker, plate) => {
    if (!normalizedQuery || plate.includes(normalizedQuery)) {
      suggestions.push({ plate, trucker });
    }
  });

  return suggestions;
};

const positionSuggestionBox = (wrapper, suggestionsBox) => {
  const rect = wrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const spaceBelow = viewportHeight - rect.bottom - 8;
  const spaceAbove = rect.top - 8;
  const preferredMaxHeight = Math.min(220, Math.max(120, Math.floor(viewportHeight * 0.4)));
  const canOpenBelow = spaceBelow >= preferredMaxHeight;
  const canOpenAbove = spaceAbove >= preferredMaxHeight;

  let openUp = false;
  let maxHeight = preferredMaxHeight;

  if (canOpenBelow) {
    openUp = false;
    maxHeight = Math.min(preferredMaxHeight, Math.max(90, spaceBelow - 12));
  } else if (canOpenAbove) {
    openUp = true;
    maxHeight = Math.min(preferredMaxHeight, Math.max(90, spaceAbove - 12));
  } else {
    openUp = spaceAbove > spaceBelow;
    maxHeight = Math.min(preferredMaxHeight, Math.max(90, Math.max(spaceAbove, spaceBelow) - 12));
  }

  suggestionsBox.classList.toggle('open-up', openUp);
  suggestionsBox.style.top = openUp ? 'auto' : 'calc(100% + 6px)';
  suggestionsBox.style.bottom = openUp ? 'calc(100% + 6px)' : 'auto';
  suggestionsBox.style.maxHeight = `${maxHeight}px`;
};

const attachPlateAutocomplete = (plateInput) => {
  if (!plateInput || plateInput.dataset.autocompleteBound === 'true') {
    return;
  }

  const form = plateInput.closest('form');
  const truckerInput = form?.querySelector('input[data-field="trucker"]');
  const wrapper = document.createElement('div');
  wrapper.className = 'plate-input-with-suggestions';
  plateInput.parentNode.insertBefore(wrapper, plateInput);
  wrapper.appendChild(plateInput);

  const suggestionsBox = document.createElement('div');
  suggestionsBox.className = 'plate-suggestions';
  wrapper.appendChild(suggestionsBox);

  plateInput.setAttribute('autocomplete', 'off');

  const updateSuggestions = () => {
    const matches = getPlateSuggestions(plateInput.value);
    if (!matches.length) {
      suggestionsBox.innerHTML = '';
      suggestionsBox.classList.remove('show');
      return;
    }

    suggestionsBox.innerHTML = matches.map((item) => `
      <button type="button" class="plate-suggestion-item" data-plate="${item.plate}" data-trucker="${item.trucker}">
        <span class="plate-suggestion-plate">${item.plate}</span>
      </button>
    `).join('');
    suggestionsBox.classList.add('show');
    positionSuggestionBox(wrapper, suggestionsBox);
  };

  plateInput.addEventListener('input', () => {
    updateSuggestions();
    if (!plateInput.value.trim()) {
      if (truckerInput) truckerInput.value = '';
      return;
    }

    const normalizedInput = plateInput.value.trim().toUpperCase().replace(/\s+/g, '');
    const exactMatch = PLATE_TRUCKER_INDEX.get(normalizedInput);
    if (exactMatch && truckerInput) {
      truckerInput.value = exactMatch;
    }
  });

  plateInput.addEventListener('focus', updateSuggestions);
  plateInput.addEventListener('click', updateSuggestions);
  plateInput.addEventListener('blur', () => {
    window.setTimeout(() => {
      suggestionsBox.classList.remove('show');
    }, 120);
  });

  const handleViewportChange = () => {
    if (suggestionsBox.classList.contains('show')) {
      positionSuggestionBox(wrapper, suggestionsBox);
    }
  };

  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('scroll', handleViewportChange, true);

  plateInput.dataset.autocompleteBound = 'true';
};

const attachTextAutocomplete = (input) => {
  if (!input || input.dataset.autocompleteBound === 'true') {
    return;
  }

  const field = input.dataset.field;
  const options = TEXT_FIELD_SUGGESTIONS[field] || [];
  if (!options.length) {
    return;
  }

  const wrapper = document.createElement('div');
  wrapper.className = 'plate-input-with-suggestions';
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);

  const suggestionsBox = document.createElement('div');
  suggestionsBox.className = 'plate-suggestions';
  wrapper.appendChild(suggestionsBox);

  input.setAttribute('autocomplete', 'off');

  const updateSuggestions = () => {
    const query = input.value.trim().toUpperCase();
    const matches = options.filter((option) => !query || option.toUpperCase().includes(query));

    if (!matches.length) {
      suggestionsBox.innerHTML = '';
      suggestionsBox.classList.remove('show');
      return;
    }

    suggestionsBox.innerHTML = matches.map((option) => `
      <button type="button" class="plate-suggestion-item" data-value="${option}">
        <span class="plate-suggestion-plate">${option}</span>
      </button>
    `).join('');
    suggestionsBox.classList.add('show');
    positionSuggestionBox(wrapper, suggestionsBox);
  };

  input.addEventListener('input', updateSuggestions);
  input.addEventListener('focus', updateSuggestions);
  input.addEventListener('click', updateSuggestions);
  input.addEventListener('blur', () => {
    window.setTimeout(() => {
      suggestionsBox.classList.remove('show');
    }, 120);
  });

  const handleViewportChange = () => {
    if (suggestionsBox.classList.contains('show')) {
      positionSuggestionBox(wrapper, suggestionsBox);
    }
  };

  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('scroll', handleViewportChange, true);

  suggestionsBox.addEventListener('mousedown', (event) => {
    const suggestionButton = event.target.closest('.plate-suggestion-item');
    if (!suggestionButton) {
      return;
    }

    event.preventDefault();
    input.value = suggestionButton.dataset.value || '';
    suggestionsBox.classList.remove('show');
  });

  input.dataset.autocompleteBound = 'true';
};

const initPlateAutocompleteControls = () => {
  document.querySelectorAll('input[data-field="plateNo"]').forEach((plateInput) => {
    attachPlateAutocomplete(plateInput);
  });
};

const initTextAutocompleteControls = () => {
  document.querySelectorAll('input[data-field]').forEach((input) => {
    const field = input.dataset.field;
    if (field === 'plateNo' || !TEXT_FIELD_SUGGESTIONS[field]) {
      return;
    }
    attachTextAutocomplete(input);
  });
};

const buildActivitySeedData = () => Array.from({ length: 25 }, (_, index) => {
  const months = ['Jul 2026', 'Jun 2026', 'May 2026'];
  const clients = ['YAZAKI ORD', 'TOYOTA TSUSHO', 'DENSO PHIL.', 'NIPPON EXPRESS', 'KURASHIKI CORP'];
  const maws = ['SPSF-26A-030', '418650', 'TYC0018-26A', '5533899552', 'ICL-07-126'];
  const hawbs = ['YPH-04800983', 'YPH-04807585', 'YPH-04808204', 'YMY-05298532', 'YPH-63792105'];
  const statuses = ['DELIVERED', 'TRANSFERRED', 'HOLD', 'PULLED OUT', 'WAITING FOR CONFIRMATION', 'OFF LOAD', 'RETURN', 'BACK TO SHIPPER', 'PICK-UP BY CLIENT', 'RE-BOOK', 'CANCEL FLIGHT'];
  const locations = ['Aisle A', 'Aisle B', 'Aisle C', 'Aisle A', 'Aisle B'];
  const dateIns = ['2026-07-01', '2026-06-27', '2026-05-11', '2026-07-03', '2026-06-20'];
  const dateOuts = ['2026-07-05', '2026-06-29', '2026-05-14', '2026-07-06', '2026-06-23'];
  const quantityIns = [12, 18, 9, 14, 21];
  const quantityOuts = [8, 10, 5, 7, 11];

  return {
    month: months[index % months.length],
    client: clients[index % clients.length],
    mawb: maws[index % maws.length],
    hawb: hawbs[index % hawbs.length],
    location: locations[index % locations.length],
    dateIn: dateIns[index % dateIns.length],
    qtyIn: quantityIns[index % quantityIns.length],
    dateOut: dateOuts[index % dateOuts.length],
    qtyOut: quantityOuts[index % quantityOuts.length],
    status: statuses[index % statuses.length],
    badgeClass: getBadgeClass(statuses[index % statuses.length])
  };
});

const buildInventorySeedData = () => Array.from({ length: 50 }, (_, index) => {
  const clients = ['YAZAKI', 'DAIHO', 'TY COMPOSITE', 'FUJIFILM OPTICS', 'TI CLARK'];
  const hawbs = ['YPH-04800983', 'YPH-04807585', 'YPH-04808204', 'YMY-05298532', 'YPH-63792105'];
  const maws = ['SPSF-26A-030', '418650', 'TYC0018-26A', 'N/A', '5533899552'];
  const transactionTypes = ['OFF EXPORT', 'AFF EXPORT', 'OFF EXPORT', 'OFF IMPORT', 'AFF EXPORT'];
  const locations = ['Aisle A', 'Aisle B', 'Aisle A', 'Aisle A', 'Aisle A'];
  const quantities = ['5 CTN', '11 CTN', '1 CRT', '11 PLT', '7 CTN'];
  const statuses = ['WAITING FOR CONFIRMATION', 'HOLD', 'RETURN', 'PULLED OUT', 'OFF LOAD', 'BACK TO SHIPPER', 'DELIVERED', 'TRANSFERRED'];
  const destinations = ['Manila', 'Cebu', 'Davao', 'Clark', 'Iloilo'];
  const invoices = ['INV-001', 'INV-002', 'INV-003', 'INV-004', 'INV-005'];
  const modules = ['M1', 'M2', 'M3', 'M4', 'M5'];
  const flights = ['PR 123', '5J 788', 'QR 456', 'TG 090', 'CX 321'];
  const receivedDates = ['2025-09-10', '2025-09-11', '2025-09-12', '2025-09-13', '2025-09-14'];
  const receivedTimes = ['08:45', '09:15', '10:00', '11:30', '13:20'];
  const receivedBys = ['Anna', 'Ben', 'Cara', 'Dave', 'Elena'];
  const receivingPlates = ['ABC-1234', 'DEF-5678', 'GHI-9012', 'JKL-3456', 'MNO-7890'];
  const truckers = ['Lima Transport', 'Nova Cargo', 'Prime Haul', 'Echo Logistics', 'Delta Trucking'];
  const drivers = ['Ramon', 'Maria', 'Jasper', 'Nina', 'Oscar'];
  const cargoConditions = ['Good', 'Damaged', 'Inspected', 'Refrigerated', 'Secure'];
  const cargoHandlings = ['Palletized', 'Loose', 'Fragile', 'Heavy', 'Standard'];
  const partialFulls = ['Full', 'Partial', 'Full', 'Partial', 'Full'];
  const units = ['CTN', 'PLT', 'CRT', 'PCS', 'BOX'];
  const releaseDates = ['2025-09-15', '2025-09-16', '2025-09-17', '2025-09-18', '2025-09-19'];
  const releaseTimes = ['14:00', '15:30', '16:45', '17:20', '18:05'];
  const releasePlates = ['PQR-1122', 'STU-3344', 'VWX-5566', 'YZA-7788', 'BCD-9900'];
  const releaseDrivers = ['Paul', 'Rita', 'Sam', 'Tina', 'Umar'];
  const remarks = ['Ready for release', 'Pending inspection', 'Awaiting docs', 'Hold for customs', 'Cleared'];
  const badgeClass = getBadgeClass(statuses[index % statuses.length]);

  return {
    client: clients[index % clients.length],
    destination: destinations[index % destinations.length],
    hawb: hawbs[index % hawbs.length],
    mawb: maws[index % maws.length],
    invoice: invoices[index % invoices.length],
    transactionType: transactionTypes[index % transactionTypes.length],
    module: modules[index % modules.length],
    flight: flights[index % flights.length],
    date: receivedDates[index % receivedDates.length],
    time: receivedTimes[index % receivedTimes.length],
    receivedBy: receivedBys[index % receivedBys.length],
    receivingPlate: receivingPlates[index % receivingPlates.length],
    trucker: truckers[index % truckers.length],
    driver: drivers[index % drivers.length],
    cargoCondition: cargoConditions[index % cargoConditions.length],
    location: locations[index % locations.length],
    cargoHandling: cargoHandlings[index % cargoHandlings.length],
    status: statuses[index % statuses.length],
    partialFull: partialFulls[index % partialFulls.length],
    quantity: quantities[index % quantities.length],
    unit: units[index % units.length],
    remainingQuantity: quantities[index % quantities.length],
    releaseDate: releaseDates[index % releaseDates.length],
    releaseTime: releaseTimes[index % releaseTimes.length],
    releasePlate: releasePlates[index % releasePlates.length],
    releaseDriver: releaseDrivers[index % releaseDrivers.length],
    remarks: remarks[index % remarks.length],
    badgeClass
  };
});

const getActivityData = () => aggregateShipmentsByReference(getStoredShipments()).map(normalizeShipmentForActivity);

const getInventoryData = () => aggregateShipmentsByReference(getStoredShipments()).map(normalizeShipmentForInventory);

const getStoredShipments = () => {
  try {
    const storedValue = localStorage.getItem(STORAGE_KEY);
    let parsed = storedValue ? JSON.parse(storedValue) : [];
    if (Array.isArray(parsed)) {
      // Migration: populate release fields for old outbound entries
      let needsSave = false;
      parsed = parsed.map((shipment) => {
        // Inline entry type detection (to avoid calling getShipmentEntryType before it's defined)
        const entryType = shipment.entryType || (shipment.releaseQty || shipment.releaseDate || shipment.releasePlate || shipment.releaseDriver ? 'outbound' : 'inbound');
        
        if (entryType === 'outbound') {
          if (!shipment.releaseDate && shipment.date) {
            shipment.releaseDate = shipment.date;
            needsSave = true;
          }
          if (!shipment.releaseTime && shipment.time) {
            shipment.releaseTime = shipment.time;
            needsSave = true;
          }
          if (!shipment.releasePlate && shipment.plateNo) {
            shipment.releasePlate = shipment.plateNo;
            needsSave = true;
          }
          if (!shipment.releaseDriver && shipment.driver) {
            shipment.releaseDriver = shipment.driver;
            needsSave = true;
          }
        }
        return shipment;
      });
      
      // Save migrated data back to localStorage
      if (needsSave) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        } catch (error) {
          console.warn('Unable to save migrated shipment data', error);
        }
      }
      
      return parsed;
    }
  } catch (error) {
    console.warn('Unable to read shipment storage. Using in-memory fallback.', error);
  }

  return Array.isArray(inMemoryShipmentStore) ? inMemoryShipmentStore : [];
};

const saveStoredShipments = (shipments) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shipments));
  } catch (error) {
    console.warn('Unable to persist shipment storage. Using in-memory fallback.', error);
    inMemoryShipmentStore = shipments;
  }
  window.dispatchEvent(new Event('warehouse:data-updated'));
};

const getBadgeClass = (status) => {
  if (!status) return 'badge-waiting-confirmation';
  const normalizedStatus = String(status).toUpperCase().trim();

  if (normalizedStatus.includes('DELIVER')) return 'badge-delivered';
  if (normalizedStatus.includes('TRANSFER')) return 'badge-transferred';
  if (normalizedStatus.includes('HOLD')) return 'badge-hold';
  if (normalizedStatus.includes('PULLED OUT')) return 'badge-pulled-out';
  if (normalizedStatus.includes('WAITING FOR CONFIRMATION')) return 'badge-waiting-confirmation';
  if (normalizedStatus.includes('OFF LOAD')) return 'badge-off-load';
  if (normalizedStatus.includes('RETURN')) return 'badge-return';
  if (normalizedStatus.includes('BACK TO SHIPPER')) return 'badge-back-to-shipper';
  if (normalizedStatus.includes('PICK-UP BY CLIENT')) return 'badge-pick-up-by-client';
  if (normalizedStatus.includes('RE-BOOK')) return 'badge-re-book';
  if (normalizedStatus.includes('CANCEL FLIGHT')) return 'badge-cancel-flight';

  if (normalizedStatus.includes('RELEASE')) return 'badge-transferred';
  if (normalizedStatus.includes('RECEIVED')) return 'badge-delivered';
  if (normalizedStatus.includes('PARTIAL')) return 'badge-waiting-confirmation';
  return 'badge-blue';
};

const getMonthLabel = (dateValue) => {
  if (!dateValue) return 'N/A';
  const parsedDate = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(parsedDate.getTime())) {
    return 'N/A';
  }
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(parsedDate);
};

const getQuantityValue = (shipment) => {
  const quantityText = shipment?.quantity || '';
  const numericValue = Number(String(quantityText).match(/\d+/)?.[0] || 0);
  return Number.isFinite(numericValue) ? numericValue : 0;
};

const parseQuantityNumber = (value) => {
  if (value === null || value === undefined || value === '') {
    return 0;
  }

  const numericText = String(value).trim();
  const match = numericText.match(/-?\d+(?:\.\d+)?/);
  if (!match) {
    return 0;
  }

  const parsedValue = Number(match[0]);
  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

const formatQuantityDisplay = (value, unit) => {
  const numericValue = parseQuantityNumber(value);
  if (!numericValue) {
    return '';
  }

  const unitText = unit ? ` ${unit}` : '';
  return `${numericValue}${unitText}`;
};

const getShipmentAggregateKey = (shipment) => {
  const hawb = String(shipment?.hawb || '').trim().toUpperCase();
  const mawb = String(shipment?.mawb || '').trim().toUpperCase();

  if (hawb) {
    return `hawb:${hawb}`;
  }

  if (mawb) {
    return `mawb:${mawb}`;
  }

  return `manual:${shipment?.savedAt || Date.now()}`;
};

const getShipmentEntryType = (shipment) => {
  if (shipment?.entryType === 'outbound') {
    return 'outbound';
  }

  if (shipment?.entryType === 'inbound') {
    return 'inbound';
  }

  const hasOutboundSignals = [shipment?.qtyOut, shipment?.releaseQty, shipment?.releaseDate, shipment?.releaseTime, shipment?.releasePlate, shipment?.releaseDriver, shipment?.releasedBy].some((value) => String(value || '').trim());
  return hasOutboundSignals ? 'outbound' : 'inbound';
};

const resolveCargoHandling = (conditionIn, conditionOut) => {
  const inbound = String(conditionIn || '').trim();
  const outbound = String(conditionOut || '').trim();

  if (!inbound) {
    return '';
  }

  if (!outbound) {
    return '';
  }

  return inbound.toUpperCase() === outbound.toUpperCase() ? 'GOOD' : 'FOR CHECKING';
};

const aggregateShipmentsByReference = (shipments) => {
  const groupedEntries = new Map();

  shipments.forEach((shipment) => {
    const key = getShipmentAggregateKey(shipment);
    if (!groupedEntries.has(key)) {
      groupedEntries.set(key, {
        client: '',
        destination: '',
        hawb: '',
        mawb: '',
        invoice: '',
        transactionType: '',
        module: '',
        flight: '',
        date: '',
        time: '',
        receivedBy: '',
        receivingPlate: '',
        trucker: '',
        driver: '',
        cargoCondition: '',
        cargoConditionIn: '',
        cargoConditionOut: '',
        cargoHandling: '',
        cargoConditionInSavedAt: 0,
        cargoConditionOutSavedAt: 0,
        location: '',
        status: 'WAITING FOR CONFIRMATION',
        partialFull: '',
        quantity: '',
        unit: '',
        qtyInValue: 0,
        qtyOutValue: 0,
        remainingValue: 0,
        releaseDate: '',
        releaseTime: '',
        releasePlate: '',
        releaseDriver: '',
        remarks: '',
        dateIn: '',
        dateOut: '',
        savedAt: 0
      });
    }

    const groupedShipment = groupedEntries.get(key);
    const savedAt = Number(shipment?.savedAt || 0);
    const isLatestRecord = !groupedShipment.savedAt || savedAt >= groupedShipment.savedAt;
    const entryType = getShipmentEntryType(shipment);

    if (isLatestRecord) {
      groupedShipment.client = shipment.client || groupedShipment.client;
      groupedShipment.destination = shipment.destination || groupedShipment.destination;
      groupedShipment.hawb = shipment.hawb || groupedShipment.hawb;
      groupedShipment.mawb = shipment.mawb || groupedShipment.mawb;
      groupedShipment.invoice = shipment.invoice || groupedShipment.invoice;
      groupedShipment.transactionType = shipment.transactionType || groupedShipment.transactionType;
      groupedShipment.module = shipment.module || groupedShipment.module;
      groupedShipment.flight = shipment.flight || groupedShipment.flight;
      groupedShipment.date = shipment.date || groupedShipment.date;
      groupedShipment.time = shipment.time || groupedShipment.time;
      groupedShipment.receivedBy = shipment.receivedBy || shipment.releasedBy || groupedShipment.receivedBy;
      groupedShipment.receivingPlate = shipment.plateNo || groupedShipment.receivingPlate;
      groupedShipment.trucker = shipment.trucker || groupedShipment.trucker;
      groupedShipment.driver = shipment.driver || groupedShipment.driver;
      groupedShipment.cargoCondition = shipment.cargoCondition || groupedShipment.cargoCondition;
      groupedShipment.location = shipment.location || groupedShipment.location;
      groupedShipment.cargoHandling = shipment.cargoHandling || groupedShipment.cargoHandling;
      groupedShipment.status = shipment.status || groupedShipment.status;
      groupedShipment.partialFull = shipment.partialFull || groupedShipment.partialFull;
      groupedShipment.quantity = shipment.quantity || groupedShipment.quantity;
      groupedShipment.unit = shipment.unit || groupedShipment.unit;
      groupedShipment.releaseDate = shipment.releaseDate || groupedShipment.releaseDate;
      groupedShipment.releaseTime = shipment.releaseTime || groupedShipment.releaseTime;
      groupedShipment.releasePlate = shipment.releasePlate || groupedShipment.releasePlate;
      groupedShipment.releaseDriver = shipment.releaseDriver || groupedShipment.releaseDriver;
      groupedShipment.remarks = shipment.remarks || groupedShipment.remarks;
      groupedShipment.savedAt = savedAt;
    }

    if (entryType === 'inbound') {
      groupedShipment.qtyInValue += parseQuantityNumber(shipment.qtyIn || shipment.quantity || '');
      if (shipment.date && (!groupedShipment.dateIn || shipment.date > groupedShipment.dateIn)) {
        groupedShipment.dateIn = shipment.date;
      }

      const inboundCondition = String(shipment.cargoCondition || '').trim();
      if (inboundCondition && (!groupedShipment.cargoConditionIn || savedAt >= (groupedShipment.cargoConditionInSavedAt || 0))) {
        groupedShipment.cargoConditionIn = inboundCondition;
        groupedShipment.cargoConditionInSavedAt = savedAt;
      }
    } else if (entryType === 'outbound') {
      groupedShipment.qtyOutValue += parseQuantityNumber(shipment.qtyOut || shipment.releaseQty || shipment.quantity || '');
      if (shipment.date && (!groupedShipment.dateOut || shipment.date > groupedShipment.dateOut)) {
        groupedShipment.dateOut = shipment.date;
      }
      // Always preserve release information from outbound entries
      groupedShipment.releaseDate = shipment.releaseDate || groupedShipment.releaseDate;
      groupedShipment.releaseTime = shipment.releaseTime || groupedShipment.releaseTime;
      groupedShipment.releasePlate = shipment.releasePlate || groupedShipment.releasePlate;
      groupedShipment.releaseDriver = shipment.releaseDriver || groupedShipment.releaseDriver;

      const outboundCondition = String(shipment.cargoCondition || '').trim();
      if (outboundCondition && (!groupedShipment.cargoConditionOut || savedAt >= (groupedShipment.cargoConditionOutSavedAt || 0))) {
        groupedShipment.cargoConditionOut = outboundCondition;
        groupedShipment.cargoConditionOutSavedAt = savedAt;
      }
    }

    groupedShipment.cargoHandling = resolveCargoHandling(groupedShipment.cargoConditionIn, groupedShipment.cargoConditionOut);
    groupedShipment.remainingValue = groupedShipment.qtyInValue - groupedShipment.qtyOutValue;
  });

  return Array.from(groupedEntries.values()).sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
};

const buildShipmentRecord = (form) => {
  const formFields = form?.querySelectorAll('[data-field]') || [];
  const shipment = {};

  formFields.forEach((field) => {
    const key = field.getAttribute('data-field');
    if (!key) return;
    if (field.tagName === 'SELECT') {
      shipment[key] = field.value || '';
    } else {
      shipment[key] = field.value || '';
    }
  });

  const quantityRows = Array.from(form?.querySelectorAll('.qty-row') || []);
  const quantityEntries = quantityRows.map((row) => ({
    quantity: row.querySelector('[data-field="quantity"]')?.value || '',
    unit: row.querySelector('[data-field="unit"]')?.value || ''
  })).filter((entry) => entry.quantity || entry.unit);

  const firstQuantity = quantityEntries[0] || {};
  const quantityValue = firstQuantity.quantity || '';
  const isOutboundForm = Boolean(form?.closest('#outbound-content'));

  shipment.quantity = quantityValue;
  shipment.unit = firstQuantity.unit || '';
  shipment.quantityEntries = quantityEntries;
  shipment.entryType = isOutboundForm ? 'outbound' : 'inbound';
  shipment.qtyIn = isOutboundForm ? '' : quantityValue;
  shipment.qtyOut = isOutboundForm ? quantityValue : '';
  shipment.releaseQty = isOutboundForm ? quantityValue : '';
  shipment.releaseDate = isOutboundForm ? shipment.date : '';
  shipment.releaseTime = isOutboundForm ? shipment.time : '';
  shipment.releasePlate = isOutboundForm ? shipment.plateNo : '';
  shipment.releaseDriver = isOutboundForm ? shipment.driver : '';
  shipment.status = isOutboundForm ? 'RELEASED' : 'RECEIVED';
  shipment.savedAt = new Date().toISOString();

  return shipment;
};

const validateShipmentRecord = (shipment) => {
  const requiredFields = ['client', 'destination', 'hawb', 'mawb', 'transactionType', 'date', 'time', 'quantity', 'unit', 'location'];
  const missingFields = requiredFields.filter((field) => !String(shipment[field] || '').trim());
  return missingFields.length === 0;
};

const clearShipmentForm = (form) => {
  if (!form) return;
  form.reset();
  form.querySelectorAll('[data-field]').forEach((field) => {
    if (field.tagName === 'SELECT') {
      field.selectedIndex = 0;
    } else if (field.type === 'date' || field.type === 'time' || field.type === 'number') {
      field.value = '';
    } else {
      field.value = '';
    }
  });
  const quantityRows = form.querySelectorAll('.qty-row');
  if (quantityRows.length > 0) {
    const firstRow = quantityRows[0];
    const quantityField = firstRow.querySelector('[data-field="quantity"]');
    const unitField = firstRow.querySelector('[data-field="unit"]');
    if (quantityField) quantityField.value = '1';
    if (unitField) unitField.selectedIndex = 0;
  }
};

const showShipmentNotice = (message) => {
  let toast = document.getElementById('shipmentToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'shipmentToast';
    toast.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:2000;background:#0f766e;color:#fff;padding:12px 16px;border-radius:10px;box-shadow:0 10px 24px rgba(0,0,0,0.16);font-weight:600;max-width:320px;';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.display = 'block';
  window.clearTimeout(showShipmentNotice.timeoutId);
  showShipmentNotice.timeoutId = window.setTimeout(() => {
    if (toast) {
      toast.style.display = 'none';
    }
  }, 2200);
};

const normalizeShipmentForInventory = (shipment) => {
  const status = shipment.status || 'WAITING FOR CONFIRMATION';
  const unit = shipment.unit || '';
  const inboundQuantity = formatQuantityDisplay(shipment.qtyInValue || 0, unit);
  const outboundQuantity = formatQuantityDisplay(shipment.qtyOutValue || 0, unit);
  const remainingQuantity = formatQuantityDisplay(shipment.remainingValue || 0, unit);
  const quantityText = formatQuantityDisplay(shipment.quantity || Math.max(shipment.qtyInValue || 0, shipment.qtyOutValue || 0), unit);

  return {
    client: shipment.client || '',
    destination: shipment.destination || '',
    hawb: shipment.hawb || '',
    mawb: shipment.mawb || '',
    invoice: shipment.invoice || '',
    transactionType: shipment.transactionType || '',
    module: shipment.module || '',
    flight: shipment.flight || '',
    date: shipment.date || '',
    time: shipment.time || '',
    receivedBy: shipment.receivedBy || shipment.releasedBy || '',
    receivingPlate: shipment.receivingPlate || shipment.plateNo || '',
    trucker: shipment.trucker || '',
    driver: shipment.driver || '',
    cargoCondition: shipment.cargoCondition || '',
    location: shipment.location || '',
    cargoHandling: shipment.cargoHandling || resolveCargoHandling(shipment.cargoConditionIn, shipment.cargoConditionOut),
    status,
    partialFull: shipment.partialFull || '',
    quantity: quantityText,
    unit,
    qtyIn: inboundQuantity,
    qtyOut: outboundQuantity,
    remainingQuantity,
    releaseDate: shipment.releaseDate || '',
    releaseTime: shipment.releaseTime || '',
    releasePlate: shipment.releasePlate || '',
    releaseDriver: shipment.releaseDriver || '',
    remarks: shipment.remarks || '',
    badgeClass: getBadgeClass(status),
    savedAt: shipment.savedAt || 0
  };
};

const normalizeShipmentForActivity = (shipment) => {
  const status = shipment.status || 'WAITING FOR CONFIRMATION';
  const unit = shipment.unit || '';
  return {
    month: getMonthLabel(shipment.dateIn || shipment.date),
    client: shipment.client || '',
    mawb: shipment.mawb || '',
    hawb: shipment.hawb || '',
    dateIn: shipment.dateIn || shipment.date || '',
    qtyIn: formatQuantityDisplay(shipment.qtyInValue || 0, unit),
    dateOut: shipment.dateOut || shipment.releaseDate || '',
    qtyOut: formatQuantityDisplay(shipment.qtyOutValue || 0, unit),
    status,
    badgeClass: getBadgeClass(status),
    savedAt: shipment.savedAt || 0
  };
};

const renderDashboardData = () => {
  const shipmentRows = aggregateShipmentsByReference(getStoredShipments()).slice().sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
  const totalShipments = shipmentRows.length;
  const cargoInWarehouse = shipmentRows.reduce((sum, shipment) => sum + (shipment.remainingValue || 0), 0);
  const today = new Date().toISOString().slice(0, 10);
  const incomingToday = shipmentRows.filter((shipment) => shipment.dateIn === today).length;
  const outgoingToday = shipmentRows.filter((shipment) => shipment.dateOut === today).length;
  const waitingForConfirmation = shipmentRows.filter((shipment) => String(shipment.status || '').toUpperCase() === 'WAITING FOR CONFIRMATION').length;

  const totalValue = document.getElementById('dashboardTotalShipments');
  const cargoValue = document.getElementById('dashboardCargoInWarehouse');
  const incomingValue = document.getElementById('dashboardIncomingToday');
  const outgoingValue = document.getElementById('dashboardOutgoingToday');
  const waitingValue = document.getElementById('dashboardWaitingForConfirmation');
  const recentBody = document.getElementById('recentShipmentsBody');

  if (totalValue) totalValue.textContent = totalShipments.toLocaleString();
  if (cargoValue) cargoValue.textContent = cargoInWarehouse.toLocaleString();
  if (incomingValue) incomingValue.textContent = incomingToday.toLocaleString();
  if (outgoingValue) outgoingValue.textContent = outgoingToday.toLocaleString();
  if (waitingValue) waitingValue.textContent = waitingForConfirmation.toLocaleString();

  if (recentBody) {
    recentBody.innerHTML = shipmentRows.slice(0, 5).map((shipment) => `
      <tr>
        <td><strong>${shipment.client || ''}</strong></td>
        <td><a href="#">${shipment.hawb || ''}</a></td>
        <td><span class="${getBadgeClass(shipment.status)}">${shipment.status || 'WAITING FOR CONFIRMATION'}</span></td>
        <td>${shipment.location || ''}</td>
        <td>${shipment.date || ''} ${shipment.time || ''}</td>
      </tr>
    `).join('');
  }
};

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  
  if (sidebarToggle && sidebar) {
    // Load saved state from localStorage
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (isCollapsed) {
      sidebar.classList.add('collapsed');
    }
    
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      // Save state to localStorage
      const collapsed = sidebar.classList.contains('collapsed');
      localStorage.setItem('sidebarCollapsed', collapsed);
    });
  }

  // User profile dropdown functionality
  const userProfileBtn = document.getElementById('userProfileBtn');
  const userDropdown = document.getElementById('userDropdown');

  if (userProfileBtn && userDropdown) {
    let logoutConfirmModal = null;

    const createLogoutConfirmModal = () => {
      const modal = document.createElement('div');
      modal.className = 'logout-confirm-overlay';
      modal.innerHTML = `
        <div class="logout-confirm-inner">
          <h2>Confirm logout</h2>
          <p>Are you sure you want to log out?</p>
          <div class="logout-confirm-actions">
            <button type="button" class="logout-confirm-btn logout-cancel">Cancel</button>
            <button type="button" class="logout-confirm-btn logout-confirm danger">Logout</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);

      modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.classList.contains('logout-cancel')) {
          modal.style.display = 'none';
        }
      });

      const confirmButton = modal.querySelector('.logout-confirm');
      if (confirmButton) {
        confirmButton.addEventListener('click', () => {
          window.location.href = '../index.html';
        });
      }

      return modal;
    };

    const openLogoutConfirmModal = () => {
      if (!logoutConfirmModal) {
        logoutConfirmModal = createLogoutConfirmModal();
      }
      logoutConfirmModal.style.display = 'flex';
    };

    userProfileBtn.addEventListener('click', () => {
      userDropdown.classList.toggle('open');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
      if (!userProfileBtn.contains(event.target) && !userDropdown.contains(event.target)) {
        userDropdown.classList.remove('open');
      }
    });

    // Close dropdown when clicking a link
    userDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', (event) => {
        if (link.classList.contains('logout-link')) {
          event.preventDefault();
          userDropdown.classList.remove('open');
          openLogoutConfirmModal();
          return;
        }
        userDropdown.classList.remove('open');
      });
    });
  }

  const inventoryFilterToggle = document.getElementById('inventoryFilterToggle');
  const inventoryFilterPanel = document.getElementById('inventoryFilterPanel');

  if (inventoryFilterToggle && inventoryFilterPanel) {
    inventoryFilterToggle.addEventListener('click', () => {
      const isExpanded = inventoryFilterToggle.getAttribute('aria-expanded') === 'true';
      inventoryFilterToggle.setAttribute('aria-expanded', String(!isExpanded));
      inventoryFilterPanel.classList.toggle('open', !isExpanded);
      inventoryFilterPanel.setAttribute('aria-hidden', String(isExpanded));
    });
  }

  const inventoryClearFilters = document.getElementById('inventoryClearFilters');
  const inventoryLocation = document.getElementById('inventory-location');
  const inventoryTransaction = document.getElementById('inventory-transaction');
  const inventorySort = document.getElementById('inventory-sort');

  if (inventoryClearFilters && inventoryLocation && inventoryTransaction && inventorySort) {
    inventoryClearFilters.addEventListener('click', () => {
      inventoryLocation.selectedIndex = 0;
      inventoryTransaction.selectedIndex = 0;
      inventorySort.selectedIndex = 0;
      if (typeof refreshInventory === 'function') {
        refreshInventory();
      }
    });
  }

  const activityFilterToggle = document.getElementById('activityFilterToggle');
  const activityFilterPanel = document.getElementById('activityFilterPanel');

  if (activityFilterToggle && activityFilterPanel) {
    activityFilterToggle.addEventListener('click', () => {
      const isExpanded = activityFilterToggle.getAttribute('aria-expanded') === 'true';
      activityFilterToggle.setAttribute('aria-expanded', String(!isExpanded));
      activityFilterPanel.classList.toggle('open', !isExpanded);
      activityFilterPanel.setAttribute('aria-hidden', String(isExpanded));
    });
  }

  const activityTableBody = document.getElementById('activityTableBody');
  const activityPagination = document.getElementById('activityPagination');

  if (activityTableBody && activityPagination) {
    activityData = getActivityData();

    const activitySearchInput = document.getElementById('activitySearchInput');
    const activityMonthSelect = document.getElementById('activity-month');
    const activityStatusSelect = document.getElementById('activity-status');
    const activityLocationSelect = document.getElementById('activity-location');
    const activityClearFilters = document.getElementById('activityClearFilters');
    const activityPageSizeButtons = document.querySelectorAll('.page-size-button');

    const getActivityRowsPerPage = () => {
      const activeButton = document.querySelector('.page-size-button.active');
      const selected = activeButton?.dataset.size || '10';
      return selected === 'all' ? activityData.length : Number(selected);
    };

    const getFilteredActivityData = () => {
      const query = activitySearchInput?.value.trim().toLowerCase() || '';
      const month = activityMonthSelect?.value || '';
      const status = activityStatusSelect?.value || '';
      const location = activityLocationSelect?.value || '';

      return activityData.filter((item) => {
        const queryMatch = !query || [item.month, item.client, item.mawb, item.hawb].some((field) => field.toLowerCase().includes(query));
        const monthMatch = !month || item.month.toLowerCase() === month.toLowerCase();
        const statusMatch = !status || item.status.toLowerCase() === status.toLowerCase();
        const locationMatch = !location || item.location.toLowerCase() === location.toLowerCase();
        return queryMatch && monthMatch && statusMatch && locationMatch;
      });
    };

    const getActivityReportExportRows = () => {
      const rows = getFilteredActivityData();
      return rows.map((item) => ({
        month: item.month || '',
        client: item.client || '',
        mawb: item.mawb || '',
        hawb: item.hawb || '',
        dateIn: item.dateIn || '',
        qtyIn: item.qtyIn || '',
        dateOut: item.dateOut || '',
        qtyOut: item.qtyOut || '',
        status: item.status || ''
      }));
    };

    const formatExportDate = () => {
      const now = new Date();
      return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(now);
    };

    const formatExportFileDate = () => {
      const now = new Date();
      return new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).format(now).replace(/-/g, '-');
    };

    const exportToExcel = () => {
      if (!window.XLSX) {
        alert('Excel export library is unavailable.');
        return;
      }

      const exportRows = getActivityReportExportRows();
      const headers = ['Month', 'Client', 'MAWB', 'HAWB', 'Date In', 'Qty In', 'Date Out', 'Qty Out', 'Status'];
      const sheetRows = [
        ['Amvel Warehouse Activity Report'],
        ['Yusen Logistics Philippines Inc.'],
        [`Export Date: ${formatExportDate()}`],
        [],
        headers,
        ...exportRows.map((row) => [
          row.month,
          row.client,
          row.mawb,
          row.hawb,
          row.dateIn,
          row.qtyIn,
          row.dateOut,
          row.qtyOut,
          row.status
        ])
      ];

      const worksheet = XLSX.utils.aoa_to_sheet(sheetRows);
      worksheet['!cols'] = headers.map((header, index) => ({
        wch: index === 1 ? 28 : 16
      }));
      worksheet['!freeze'] = { ySplit: 4 };

      const headerRow = 5;
      const totalRows = sheetRows.length;
      const totalCols = headers.length;
      for (let rowIndex = 1; rowIndex <= totalRows; rowIndex += 1) {
        for (let colIndex = 1; colIndex <= totalCols; colIndex += 1) {
          const cellAddress = XLSX.utils.encode_cell({ r: rowIndex - 1, c: colIndex - 1 });
          const cell = worksheet[cellAddress];
          if (!cell) continue;

          if (rowIndex === headerRow) {
            cell.s = {
              fill: { fgColor: { rgb: '06183D' } },
              font: { bold: true, color: { rgb: 'FFFFFF' }, sz: 10 },
              alignment: { horizontal: 'center', vertical: 'center' },
              border: {
                top: { style: 'thin', color: { rgb: '000000' } },
                right: { style: 'thin', color: { rgb: '000000' } },
                bottom: { style: 'thin', color: { rgb: '000000' } },
                left: { style: 'thin', color: { rgb: '000000' } }
              }
            };
          } else if (rowIndex > headerRow) {
            cell.s = {
              alignment: { horizontal: colIndex === 2 ? 'left' : 'center', vertical: 'center' },
              border: {
                top: { style: 'thin', color: { rgb: 'D1D5DB' } },
                right: { style: 'thin', color: { rgb: 'D1D5DB' } },
                bottom: { style: 'thin', color: { rgb: 'D1D5DB' } },
                left: { style: 'thin', color: { rgb: 'D1D5DB' } }
              }
            };
          } else {
            cell.s = {
              font: { bold: true, sz: 12, color: { rgb: '06183D' } },
              alignment: { horizontal: 'left', vertical: 'center' }
            };
          }
        }
      }

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Activity Report');
      XLSX.writeFile(workbook, `Activity_Report_${formatExportFileDate()}.xlsx`);
    };

    const exportToPDF = () => {
      const exportRows = getActivityReportExportRows();
      const headers = ['Month', 'Client', 'MAWB', 'HAWB', 'Date In', 'Qty In', 'Date Out', 'Qty Out', 'Status'];
      const bodyRows = exportRows.map((row) => [
        row.month,
        row.client,
        row.mawb,
        row.hawb,
        row.dateIn,
        row.qtyIn,
        row.dateOut,
        row.qtyOut,
        row.status
      ]);

      const jsPDFConstructor = window.jspdf?.jsPDF || window.jsPDF;
      if (typeof jsPDFConstructor !== 'function') {
        console.warn('jsPDF library is unavailable. Falling back to print preview.');
        printReport();
        return;
      }

      const doc = new jsPDFConstructor({ orientation: 'landscape', unit: 'pt', format: 'a4' });
      if (typeof doc.autoTable !== 'function') {
        console.warn('jsPDF autoTable is unavailable. Falling back to print preview.');
        printReport();
        return;
      }

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 36;

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text('Amvel Warehouse Activity Report', margin, 48);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text('Yusen Logistics Philippines Inc.', margin, 70);
      doc.text(`Export Date: ${formatExportDate()}`, pageWidth - margin - 140, 70);

      doc.autoTable({
        startY: 96,
        head: [headers],
        body: bodyRows,
        theme: 'grid',
        headStyles: {
          fillColor: [6, 24, 61],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        styles: {
          fontSize: 8.5,
          cellPadding: 4,
          lineColor: [209, 213, 219],
          lineWidth: 0.25
        },
        columnStyles: {
          1: { halign: 'left' }
        },
        margin: { top: 96, right: margin, bottom: 40, left: margin },
        didDrawPage: (data) => {
          const pageNumberText = `Page ${data.pageNumber}`;
          doc.setFontSize(8);
          doc.text(pageNumberText, pageWidth - margin, pageHeight - 20, { align: 'right' });
        }
      });

      doc.save(`Activity_Report_${formatExportFileDate()}.pdf`);
    };

    const printReport = () => {
      const exportRows = getActivityReportExportRows();
      const printWrapper = document.createElement('div');
      printWrapper.className = 'print-report-wrapper';
      printWrapper.innerHTML = `
        <div class="print-report-header">
          <h1>Amvel Warehouse Activity Report</h1>
          <p>Yusen Logistics Philippines Inc.</p>
          <p>Printed on ${formatExportDate()}</p>
        </div>
        <table class="print-report-table">
          <thead>
            <tr>
              <th>Month</th>
              <th>Client</th>
              <th>MAWB</th>
              <th>HAWB</th>
              <th>Date In</th>
              <th>Qty In</th>
              <th>Date Out</th>
              <th>Qty Out</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${exportRows.map((row) => `
              <tr>
                <td>${row.month}</td>
                <td class="client-cell">${row.client}</td>
                <td>${row.mawb}</td>
                <td>${row.hawb}</td>
                <td>${row.dateIn}</td>
                <td>${row.qtyIn}</td>
                <td>${row.dateOut}</td>
                <td>${row.qtyOut}</td>
                <td>${row.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;

      document.body.appendChild(printWrapper);
      document.body.classList.add('print-report-active');
      window.print();
      window.setTimeout(() => {
        printWrapper.remove();
        document.body.classList.remove('print-report-active');
      }, 400);
    };

    const renderActivityPage = (pageNumber) => {
      const filteredData = getFilteredActivityData();
      const currentRowsPerPage = getActivityRowsPerPage();
      const totalPages = currentRowsPerPage === filteredData.length ? 1 : Math.ceil(filteredData.length / currentRowsPerPage);
      const currentPage = Math.min(Math.max(pageNumber, 1), totalPages || 1);
      const start = (currentPage - 1) * currentRowsPerPage;
      const items = filteredData.slice(start, start + currentRowsPerPage);

      if (!items.length) {
        activityTableBody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:24px;color:#64748b;">No activity data saved yet.</td></tr>';
      } else {
        activityTableBody.innerHTML = items.map((item) => `
          <tr>
            <td>${item.month}</td>
            <td>${item.client}</td>
            <td>${item.mawb}</td>
            <td>${item.hawb}</td>
            <td>${item.dateIn}</td>
            <td>${item.qtyIn}</td>
            <td>${item.dateOut}</td>
            <td>${item.qtyOut}</td>
            <td><span class="${item.badgeClass}">${item.status}</span></td>
          </tr>
        `).join('');
      }

      activityPagination.innerHTML = '';
      for (let page = 1; page <= totalPages; page += 1) {
        const pageButton = document.createElement('button');
        pageButton.type = 'button';
        pageButton.className = 'page-box';
        pageButton.dataset.page = String(page);
        pageButton.textContent = String(page);
        if (page === currentPage) {
          pageButton.classList.add('active');
        }
        activityPagination.appendChild(pageButton);
      }
    };

    refreshActivity = () => renderActivityPage(1);

    const activityExportExcelButton = document.querySelector('.toolbar-btn.excel-btn');
    const activityExportPdfButton = document.querySelector('.toolbar-btn.pdf-btn');
    const activityPrintButton = document.querySelector('.toolbar-btn.print-btn');

    activityExportExcelButton?.addEventListener('click', exportToExcel);
    activityExportPdfButton?.addEventListener('click', exportToPDF);
    activityPrintButton?.addEventListener('click', printReport);

    activitySearchInput?.addEventListener('input', refreshActivity);
    activityMonthSelect?.addEventListener('change', refreshActivity);
    activityStatusSelect?.addEventListener('change', refreshActivity);
    activityLocationSelect?.addEventListener('change', refreshActivity);

    activityClearFilters?.addEventListener('click', () => {
      if (activitySearchInput) {
        activitySearchInput.value = '';
      }
      if (activityMonthSelect) {
        activityMonthSelect.value = '';
      }
      if (activityStatusSelect) {
        activityStatusSelect.value = '';
      }
      if (activityLocationSelect) {
        activityLocationSelect.value = '';
      }
      refreshActivity();
    });

    activityPageSizeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activityPageSizeButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        renderActivityPage(1);
      });
    });

    activityPagination.addEventListener('click', (event) => {
      const targetButton = event.target.closest('.page-box');
      if (!targetButton) return;
      renderActivityPage(Number(targetButton.dataset.page));
    });

    renderActivityPage(1);
  }

  const inventoryTableBody = document.getElementById('inventoryTableBody');
  const inventoryPagination = document.getElementById('inventoryPagination');

  if (inventoryTableBody && inventoryPagination) {
    inventoryData = getInventoryData();

    const inventorySearchInput = document.getElementById('inventorySearchInput');
    const inventoryLocationSelect = document.getElementById('inventory-location');
    const inventoryTransactionSelect = document.getElementById('inventory-transaction');
    const inventorySortSelect = document.getElementById('inventory-sort');
    const inventoryPageSizeButtons = document.querySelectorAll('.page-size-button');

    const getRowsPerPage = () => {
      const activeButton = document.querySelector('.page-size-button.active');
      const selected = activeButton?.dataset.size || '10';
      return selected === 'all' ? inventoryData.length : Number(selected);
    };

    const getInventoryQuantityValue = (item) => {
      const quantityText = item?.remainingQuantity || item?.quantity || '';
      const numericValue = Number(String(quantityText).match(/\d+/)?.[0] || 0);
      return Number.isFinite(numericValue) ? numericValue : 0;
    };

    const getFilteredInventoryData = () => {
      const query = inventorySearchInput?.value.trim().toLowerCase() || '';
      const location = inventoryLocationSelect?.value || '';
      const transactionType = inventoryTransactionSelect?.value || '';
      const sortOrder = inventorySortSelect?.value || '';

      const filteredData = inventoryData.filter((item) => {
        const queryMatch = !query || [item.client, item.hawb, item.mawb].some((field) => field.toLowerCase().includes(query));
        const locationMatch = !location || item.location.toLowerCase() === location.toLowerCase();
        const transactionMatch = !transactionType || item.transactionType.toLowerCase() === transactionType.toLowerCase();
        return queryMatch && locationMatch && transactionMatch;
      });

      if (sortOrder === 'asc') {
        filteredData.sort((a, b) => getInventoryQuantityValue(a) - getInventoryQuantityValue(b));
      } else if (sortOrder === 'desc') {
        filteredData.sort((a, b) => getInventoryQuantityValue(b) - getInventoryQuantityValue(a));
      }

      return filteredData;
    };

    const renderInventoryPage = (pageNumber) => {
      const filteredData = getFilteredInventoryData();
      const currentRowsPerPage = getRowsPerPage();
      const totalPages = currentRowsPerPage === filteredData.length ? 1 : Math.ceil(filteredData.length / currentRowsPerPage);
      const currentPage = Math.min(Math.max(pageNumber, 1), totalPages || 1);
      const start = (currentPage - 1) * currentRowsPerPage;
      const items = filteredData.slice(start, start + currentRowsPerPage);

      if (!items.length) {
        inventoryTableBody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:24px;color:#64748b;">No shipment data saved yet.</td></tr>';
      } else {
        inventoryTableBody.innerHTML = items.map((item, index) => `
          <tr>
            <td>${item.client}</td>
            <td>${item.hawb}</td>
            <td>${item.mawb}</td>
            <td>${item.transactionType}</td>
            <td>${item.location}</td>
            <td>${item.qtyIn || ''}</td>
            <td>${item.qtyOut || ''}</td>
            <td>${item.remainingQuantity || item.quantity || ''}</td>
            <td><button type="button" class="view-details-btn" data-index="${start + index}">View</button></td>
          </tr>
        `).join('');
      }

      inventoryPagination.innerHTML = '';
      for (let page = 1; page <= totalPages; page += 1) {
        const pageButton = document.createElement('button');
        pageButton.type = 'button';
        pageButton.className = 'page-box';
        pageButton.dataset.page = String(page);
        pageButton.textContent = String(page);
        if (page === currentPage) {
          pageButton.classList.add('active');
        }
        inventoryPagination.appendChild(pageButton);
      }
    };

    refreshInventory = () => renderInventoryPage(1);

    inventorySearchInput?.addEventListener('input', refreshInventory);
    inventoryLocationSelect?.addEventListener('change', refreshInventory);
    inventoryTransactionSelect?.addEventListener('change', refreshInventory);
    inventorySortSelect?.addEventListener('change', refreshInventory);

    inventoryPageSizeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        inventoryPageSizeButtons.forEach((item) => item.classList.remove('active'));
        button.classList.add('active');
        renderInventoryPage(1);
      });
    });

    inventoryPagination.addEventListener('click', (event) => {
      const targetButton = event.target.closest('.page-box');
      if (!targetButton) return;
      renderInventoryPage(Number(targetButton.dataset.page));
    });

    renderInventoryPage(1);

    const inventoryDrawer = document.getElementById('inventoryDrawer');
    const inventoryDrawerBackdrop = document.getElementById('inventoryDrawerBackdrop');
    const inventoryDrawerClose = document.getElementById('inventoryDrawerClose');
    const drawerClient = document.getElementById('drawerClient');
    const drawerDestination = document.getElementById('drawerDestination');
    const drawerHawb = document.getElementById('drawerHawb');
    const drawerMawb = document.getElementById('drawerMawb');
    const drawerInvoice = document.getElementById('drawerInvoice');
    const drawerTransaction = document.getElementById('drawerTransaction');
    const drawerModule = document.getElementById('drawerModule');
    const drawerFlight = document.getElementById('drawerFlight');
    const drawerDate = document.getElementById('drawerDate');
    const drawerTime = document.getElementById('drawerTime');
    const drawerReceivedBy = document.getElementById('drawerReceivedBy');
    const drawerReceivingPlate = document.getElementById('drawerReceivingPlate');
    const drawerTrucker = document.getElementById('drawerTrucker');
    const drawerDriver = document.getElementById('drawerDriver');
    const drawerCargoCondition = document.getElementById('drawerCargoCondition');
    const drawerLocation = document.getElementById('drawerLocation');
    const drawerCargoHandling = document.getElementById('drawerCargoHandling');
    const drawerStatus = document.getElementById('drawerStatus');
    const drawerPartialFull = document.getElementById('drawerPartialFull');
    const drawerQty = document.getElementById('drawerQty');
    const drawerUnit = document.getElementById('drawerUnit');
    const drawerRemainingQuantity = document.getElementById('drawerRemainingQuantity');
    const drawerReleaseDate = document.getElementById('drawerReleaseDate');
    const drawerReleaseTime = document.getElementById('drawerReleaseTime');
    const drawerReleasePlate = document.getElementById('drawerReleasePlate');
    const drawerReleaseDriver = document.getElementById('drawerReleaseDriver');
    const drawerRemarks = document.getElementById('drawerRemarks');

    const openInventoryDrawer = (item) => {
      if (!inventoryDrawer) return;
      drawerClient.textContent = item.client;
      drawerDestination.textContent = item.destination;
      drawerHawb.textContent = item.hawb;
      drawerMawb.textContent = item.mawb;
      drawerInvoice.textContent = item.invoice;
      drawerTransaction.textContent = item.transactionType;
      drawerModule.textContent = item.module;
      drawerFlight.textContent = item.flight;
      drawerDate.textContent = item.date;
      drawerTime.textContent = item.time;
      drawerReceivedBy.textContent = item.receivedBy;
      drawerReceivingPlate.textContent = item.receivingPlate;
      drawerTrucker.textContent = item.trucker;
      drawerDriver.textContent = item.driver;
      drawerCargoCondition.textContent = item.cargoCondition;
      drawerLocation.textContent = item.location;
      drawerCargoHandling.textContent = item.cargoHandling || '';
      drawerCargoHandling.classList.remove('cargo-handling-good', 'cargo-handling-checking');
      if (item.cargoHandling === 'GOOD') {
        drawerCargoHandling.classList.add('cargo-handling-good');
      } else if (item.cargoHandling === 'FOR CHECKING') {
        drawerCargoHandling.classList.add('cargo-handling-checking');
      }
      drawerStatus.textContent = item.status;
      drawerPartialFull.textContent = item.partialFull;
      drawerQty.textContent = item.quantity;
      drawerUnit.textContent = item.unit;
      drawerRemainingQuantity.textContent = item.remainingQuantity;
      drawerReleaseDate.textContent = item.releaseDate;
      drawerReleaseTime.textContent = item.releaseTime;
      drawerReleasePlate.textContent = item.releasePlate;
      drawerReleaseDriver.textContent = item.releaseDriver;
      drawerRemarks.textContent = item.remarks;

      inventoryDrawer.classList.add('open');
      inventoryDrawerBackdrop.classList.add('open');
      inventoryDrawer.setAttribute('aria-hidden', 'false');
      inventoryDrawerBackdrop.hidden = false;
    };

    const closeInventoryDrawer = () => {
      if (!inventoryDrawer) return;
      inventoryDrawer.classList.remove('open');
      inventoryDrawerBackdrop.classList.remove('open');
      inventoryDrawer.setAttribute('aria-hidden', 'true');
      inventoryDrawerBackdrop.hidden = true;
    };

    inventoryTableBody.addEventListener('click', (event) => {
      const button = event.target.closest('.view-details-btn');
      if (!button) return;
      const index = Number(button.dataset.index);
      const item = inventoryData[index];
      if (item) {
        openInventoryDrawer(item);
      }
    });

    if (inventoryDrawerClose) {
      inventoryDrawerClose.addEventListener('click', closeInventoryDrawer);
    }

    if (inventoryDrawerBackdrop) {
      inventoryDrawerBackdrop.addEventListener('click', closeInventoryDrawer);
    }
  }

  initPlateAutocompleteControls();
  initTextAutocompleteControls();
  renderDashboardData();

  window.addEventListener('warehouse:data-updated', () => {
    renderDashboardData();
    activityData = getActivityData();
    inventoryData = getInventoryData();
    if (typeof refreshInventory === 'function') {
      refreshInventory();
    }
    if (typeof refreshActivity === 'function') {
      refreshActivity();
    }
  });

  // Tab switching functionality
  const tabs = document.querySelectorAll('.tab[data-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabName = tab.getAttribute('data-tab');
      
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all tab contents
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });
      
      // Show the selected tab content
      const content = document.getElementById(tabName + '-content');
      if (content) {
        content.style.display = 'block';
        content.classList.add('active');
      }
    });
  });
});

// Basic UI interactions: scan modal and dynamic quantity rows
let cameraStream = null
let qrScanLoop = null
let activeScanContext = null

const stopQrScanner = (modal) => {
  if (qrScanLoop) {
    cancelAnimationFrame(qrScanLoop)
    qrScanLoop = null
  }
  if (cameraStream) {
    cameraStream.getTracks().forEach((track) => track.stop())
    cameraStream = null
  }

  if (modal) {
    const video = modal.querySelector('video#cameraPreview')
    const cameraBox = modal.querySelector('.scan-camera')
    const fallback = modal.querySelector('.camera-fallback')

    if (video) {
      video.pause()
      video.srcObject = null
    }
    if (cameraBox) {
      cameraBox.classList.remove('active')
    }
    if (fallback) {
      fallback.textContent = 'Camera preview will appear here'
    }
  }
}

const getPhilippineDateTime = () => {
  const formatter = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Manila',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })
  const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })

  const dateParts = formatter.formatToParts(new Date())
  const timeParts = timeFormatter.formatToParts(new Date())

  const year = dateParts.find((part) => part.type === 'year')?.value || ''
  const month = dateParts.find((part) => part.type === 'month')?.value || ''
  const day = dateParts.find((part) => part.type === 'day')?.value || ''
  const hour = timeParts.find((part) => part.type === 'hour')?.value || ''
  const minute = timeParts.find((part) => part.type === 'minute')?.value || ''

  return {
    date: `${year}-${month}-${day}`,
    time: `${hour}:${minute}`
  }
}

// Convert a scanned QR payload into a predictable shipment object.
const normalizeShipmentPayload = (payload) => {
  const source = payload && typeof payload === 'object' ? payload : {}

  return {
    client: source.client || source.Client || source.shipmentClient || '',
    destination: source.destination || source.Destination || source.shipTo || '',
    hawb: source.hawb || source.HAWB || source.hawbNumber || source.shipmentId || '',
    mawb: source.mawb || source.MAWB || source.mawbNumber || '',
    invoice: source.invoice || source.invoiceNumber || source.markings || source.marking || '',
    transactionType: source.transactionType || source.transactionTypeName || source.transaction_type || source.transactionTypeLabel || source.transaction || source.type || '',
    plateNo: source.plateNo || source.plate || source.plateNumber || source.vehiclePlate || source.vehiclePlateNo || '',
    date: source.date || '',
    time: source.time || ''
  }
}

const normalizeOptionValue = (value) => String(value ?? '').toLowerCase().trim().replace(/[^a-z0-9]+/g, ' ')

const applySelectValue = (selectField, rawValue) => {
  if (!selectField || rawValue === null || typeof rawValue === 'undefined' || rawValue === '') {
    return
  }

  const normalizedTarget = normalizeOptionValue(rawValue)
  const options = Array.from(selectField.options)

  const exactMatch = options.find((option) => {
    const optionText = normalizeOptionValue(option.textContent)
    const optionValue = normalizeOptionValue(option.value)
    return optionText === normalizedTarget || optionValue === normalizedTarget
  })

  if (exactMatch) {
    selectField.value = exactMatch.value || exactMatch.textContent
    return
  }

  const fallbackMatch = options.find((option) => {
    const optionText = normalizeOptionValue(option.textContent)
    const optionValue = normalizeOptionValue(option.value)
    return optionText.includes(normalizedTarget) || optionValue.includes(normalizedTarget)
  })

  if (fallbackMatch) {
    selectField.value = fallbackMatch.value || fallbackMatch.textContent
  }
}

const getScannedSearchValue = (payload) => {
  const source = payload && typeof payload === 'object' ? payload : {}
  const candidates = [
    source.hawb,
    source.HAWB,
    source.mawb,
    source.MAWB,
    source.client,
    source.Client,
    source.shipmentId,
    source.shipmentID,
    source.id,
    source.text,
    payload
  ]

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim()
    }
    if (typeof candidate === 'number') {
      return String(candidate)
    }
  }

  return ''
}

const applyScannedPayloadToPage = (payload) => {
  const searchValue = getScannedSearchValue(payload)
  if (!searchValue) {
    return false
  }

  const inventorySearchInput = document.getElementById('inventorySearchInput')
  if (inventorySearchInput) {
    inventorySearchInput.value = searchValue
    if (typeof refreshInventory === 'function') {
      refreshInventory()
    }
    return true
  }

  const activitySearchInput = document.getElementById('activitySearchInput')
  if (activitySearchInput) {
    activitySearchInput.value = searchValue
    if (typeof refreshActivity === 'function') {
      refreshActivity()
    }
    return true
  }

  return false
}

const findStoredShipmentByScanValue = (payload) => {
  const searchValue = getScannedSearchValue(payload)
  if (!searchValue) {
    return null
  }

  const normalizedSearch = String(searchValue).trim().toLowerCase()
  const shipments = getStoredShipments()

  return shipments.find((shipment) => {
    const hawb = String(shipment?.hawb || '').trim().toLowerCase()
    const mawb = String(shipment?.mawb || '').trim().toLowerCase()
    return hawb === normalizedSearch || mawb === normalizedSearch
  }) || null
}

// Populate the currently active shipment form with values from a scanned payload.
const populateShipmentForm = (payload, context) => {
  const formContext = context || document.querySelector('.tab-content.active') || document

  const fields = formContext.querySelectorAll('[data-field]')
  const fieldValues = normalizeShipmentPayload(payload)
  const storedShipment = findStoredShipmentByScanValue(payload)

  const philippineDateTime = getPhilippineDateTime()
  if (!fieldValues.date) {
    fieldValues.date = philippineDateTime.date
  }
  if (!fieldValues.time) {
    fieldValues.time = philippineDateTime.time
  }

  if (storedShipment && formContext?.querySelector('input[data-field="location"]')) {
    const locationField = formContext.querySelector('input[data-field="location"]')
    const storedLocation = storedShipment.location || ''
    if (storedLocation) {
      locationField.value = storedLocation
      locationField.dispatchEvent(new Event('input', { bubbles: true }))
    }
  }

  if (storedShipment && formContext?.querySelector('select[data-field="unit"]')) {
    const unitField = formContext.querySelector('select[data-field="unit"]')
    const storedUnit = storedShipment.unit || ''
    if (storedUnit) {
      applySelectValue(unitField, storedUnit)
      unitField.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }

  fields.forEach((field) => {
    const fieldName = field.getAttribute('data-field')
    const value = fieldValues[fieldName]

    if (typeof value === 'undefined' || value === null) {
      return
    }

    if (field.tagName === 'SELECT') {
      applySelectValue(field, value)
      field.dispatchEvent(new Event('change', { bubbles: true }))
    } else {
      field.value = value
      field.dispatchEvent(new Event('input', { bubbles: true }))
    }
  })
}

// Handle a decoded QR result and map it into the shipment form or filter the current page.
const handleScannedPayload = (text, modal, context) => {
  try {
    const parsedPayload = JSON.parse(text)
    const pageHandled = applyScannedPayloadToPage(parsedPayload)

    if (!pageHandled) {
      populateShipmentForm(parsedPayload, context)
    }

    if (modal) {
      modal.style.display = 'none'
      modal.classList.remove('outbound', 'inbound')
    }
    stopQrScanner(modal)
    activeScanContext = null
  } catch (error) {
    const plainTextPayload = typeof text === 'string' ? text.trim() : ''
    const pageHandled = plainTextPayload ? applyScannedPayloadToPage(plainTextPayload) : false

    if (!pageHandled) {
      alert('Invalid QR Code')
    }

    if (modal) {
      modal.style.display = 'none'
      modal.classList.remove('outbound', 'inbound')
    }
    stopQrScanner(modal)
  }
}

// Start the device camera and continuously decode QR codes from the video stream.
const startQrScanner = async (modal, context) => {
  const video = modal.querySelector('video#cameraPreview')
  const cameraBox = modal.querySelector('.scan-camera')
  const fallback = modal.querySelector('.camera-fallback')

  if (!video || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (fallback) {
      fallback.textContent = 'Camera not supported on this device or browser.'
    }
    return
  }

  try {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      cameraStream = null
    }

    cameraStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false
    })

    video.srcObject = cameraStream
    await video.play().catch(() => {})

    if (cameraBox) {
      cameraBox.classList.add('active')
    }
    if (fallback) {
      fallback.textContent = ''
    }

    const canvas = document.createElement('canvas')
    const context2d = canvas.getContext('2d')

    const scanFrame = () => {
      if (!modal.isConnected || modal.style.display === 'none') {
        return
      }

      if (video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        context2d.drawImage(video, 0, 0, canvas.width, canvas.height)
        const imageData = context2d.getImageData(0, 0, canvas.width, canvas.height)
        const result = window.jsQR(imageData.data, imageData.width, imageData.height)

        if (result) {
          handleScannedPayload(result.data, modal, context)
          return
        }
      }

      qrScanLoop = requestAnimationFrame(scanFrame)
    }

    qrScanLoop = requestAnimationFrame(scanFrame)
  } catch (err) {
    if (fallback) {
      fallback.textContent = 'Unable to access camera. Please allow camera permission or use a compatible device.'
    }
    console.error('Camera access failed', err)
  }
}

document.addEventListener('click', (e)=>{
  const suggestionButton = e.target.closest('.plate-suggestion-item');
  if (suggestionButton) {
    e.preventDefault();
    const plateInput = suggestionButton.closest('.plate-input-with-suggestions')?.querySelector('input[data-field="plateNo"]');
    const truckerInput = suggestionButton.closest('form')?.querySelector('input[data-field="trucker"]');
    if (plateInput) {
      plateInput.value = suggestionButton.dataset.plate || '';
    }
    if (truckerInput) {
      truckerInput.value = suggestionButton.dataset.trucker || '';
    }
    suggestionButton.closest('.plate-input-with-suggestions').querySelector('.plate-suggestions').classList.remove('show');
    return;
  }

  const saveButton = e.target.closest('.save-shipment-btn');
  if(saveButton){
    e.preventDefault();
    const form = saveButton.closest('form');
    if(!form) return;
    const shipment = buildShipmentRecord(form);
    if(!validateShipmentRecord(shipment)){
      alert('Please complete the required shipment fields.');
      return;
    }
    const shipments = getStoredShipments();
    shipments.unshift(shipment);
    saveStoredShipments(shipments);
    clearShipmentForm(form);
    showShipmentNotice('Shipment successfully received.');
    renderDashboardData();
    return;
  }
  const scanTrigger = e.target.closest('.scan-btn, .inline-scan-btn')
  if(scanTrigger){
    e.preventDefault()
    const id = scanTrigger.getAttribute('data-target') || 'scanModal'
    const modal = document.getElementById(id)
    if(modal){
      const isOutbound = Boolean(scanTrigger.closest('#outbound-content'))
      modal.classList.toggle('outbound', isOutbound)
      modal.classList.toggle('inbound', !isOutbound)
      modal.style.display = 'flex'
      activeScanContext = scanTrigger.closest('.tab-content') || document.querySelector('.tab-content.active')
      startQrScanner(modal, activeScanContext)
    }
    return;
  }
  if(e.target.matches('.scan-close')){
    const modal = e.target.closest('.scan-modal')
    if(modal){
      modal.style.display = 'none'
      modal.classList.remove('outbound', 'inbound')
      stopQrScanner(modal)
      activeScanContext = null
    }
  }
  if(e.target.matches('.add-qty')){
    e.preventDefault()
    const quantitySection = e.target.closest('.quantity-section')
    const list = quantitySection.querySelector('.quantity-list')
    if(list){
      const row = document.createElement('div')
      row.className = 'qty-row'
      row.innerHTML = '<div class="form-field qty-field"><label>Quantity</label><input type="number" min="1" value="1" placeholder="Quantity" data-field="quantity"/></div><div class="form-field qty-field"><label>Unit</label><select data-field="unit"><option value="" disabled selected>Select unit</option><option>Carton</option><option>Pallet</option><option>Barrel</option><option>Box</option><option>Crate</option></select></div><button type="button" class="btn-delete" aria-label="Delete quantity"><i class="bi bi-trash3-fill"></i></button>'
      list.appendChild(row)
    }
  }
  const deleteButton = e.target.closest('.btn-delete');
  if(deleteButton){
    e.preventDefault();
    const row = deleteButton.closest('.qty-row');
    if(row) row.remove();
    return;
  }
  if(e.target.matches('.remove-qty')){
    const row = e.target.closest('.qty-row')
    if(row) row.remove()
  }
})
