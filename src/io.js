#define hwr mem._hwr

pseudo.CstrHardware = (function() {
  // Exposed class functions/variables
  return {
    write: {
      w(addr, data) {
        addr&=0xffff;

        if (addr >= 0x0000 && addr <= 0x03ff) { // Scratchpad
          directMemW(hwr.uw, addr) = data;
          return;
        }

        switch(addr) {
          case 0x1000:
          case 0x1004:
          case 0x1008:
          case 0x100c:
          case 0x1010:
          case 0x1014:
          case 0x1018:
          case 0x101c:
          case 0x1020:
          case 0x1060:
          case 0x1070: //
          case 0x1074: //
            directMemW(hwr.uw, addr) = data;
            return;
        }
        psx.error('pseudo / Hardware write w '+hex(addr)+' <- '+hex(data));
      },

      h(addr, data) {
        addr&=0xffff;
        
        if (addr >= 0x1d80 && addr <= 0x1d86) { // Audio
          directMemH(hwr.uh, addr) = data;
          return;
        }

        switch(addr) {
          case 0x1100:
          case 0x1104:
          case 0x1108:
          case 0x1110:
          case 0x1114:
          case 0x1118:
          case 0x1120:
          case 0x1124:
          case 0x1128:
            directMemH(hwr.uh, addr) = data;
            return;
        }
        psx.error('pseudo / Hardware write h '+hex(addr)+' <- '+hex(data));
      },

      b(addr, data) {
        addr&=0xffff;
        
        switch(addr) {
          case 0x2041:
            directMemB(hwr.ub, addr) = data;
            return;
        }
        psx.error('pseudo / Hardware write b '+hex(addr)+' <- '+hex(data));
      }
    },

    read: {
      w(addr) {
        addr&=0xffff;

        switch(addr) {
          case 0x1074:
            return directMemW(hwr.uw, addr);
        }
        psx.error('pseudo / Hardware read w '+hex(addr));
      }
    }
  };
})();

#undef hwr
