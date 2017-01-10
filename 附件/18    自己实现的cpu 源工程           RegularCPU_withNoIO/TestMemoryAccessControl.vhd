--------------------------------------------------------------------------------
-- Company: 
-- Engineer:
--
-- Create Date:   11:02:25 07/27/2016
-- Design Name:   
-- Module Name:   H:/RegularCPU_withNoIO/TestMemoryAccessControl.vhd
-- Project Name:  RegularCPU
-- Target Device:  
-- Tool versions:  
-- Description:   
-- 
-- VHDL Test Bench Created by ISE for module: MemoryAccessControl
-- 
-- Dependencies:
-- 
-- Revision:
-- Revision 0.01 - File Created
-- Additional Comments:
--
-- Notes: 
-- This testbench has been automatically generated using types std_logic and
-- std_logic_vector for the ports of the unit under test.  Xilinx recommends
-- that these types always be used for the top-level I/O of a design in order
-- to guarantee that the testbench will bind correctly to the post-implementation 
-- simulation model.
--------------------------------------------------------------------------------
LIBRARY ieee;
USE ieee.std_logic_1164.ALL;
 
-- Uncomment the following library declaration if using
-- arithmetic functions with Signed or Unsigned values
--USE ieee.numeric_std.ALL;
 
ENTITY TestMemoryAccessControl IS
END TestMemoryAccessControl;
 
ARCHITECTURE behavior OF TestMemoryAccessControl IS 
 
    -- Component Declaration for the Unit Under Test (UUT)
 
    COMPONENT MemoryAccessControl
    PORT(
         cs_fetc : IN  std_logic;
         reset : IN  std_logic;
         cs_stor : IN  std_logic;
         if_irreadin : IN  std_logic;
         sta_in : IN  std_logic;
         lda_in : IN  std_logic;
         iord_in : IN  std_logic;
         iowr_in : IN  std_logic;
         pc_in : IN  std_logic_vector(15 downto 0);
         aluaddr_in : IN  std_logic_vector(15 downto 0);
         aludata_in : IN  std_logic_vector(7 downto 0);
         fakeIOdatain : IN  std_logic_vector(7 downto 0);
         fakeIOdataout : OUT  std_logic_vector(7 downto 0);
         storage_dataout : OUT  std_logic_vector(7 downto 0);
         m_cs : OUT  std_logic;
         m_rd : OUT  std_logic;
         m_wr : OUT  std_logic;
         m_bh : OUT  std_logic;
         m_bl : OUT  std_logic;
         m_addr : OUT  std_logic_vector(15 downto 0);
         m_databus : INOUT  std_logic_vector(15 downto 0);
         ir_readout : OUT  std_logic_vector(15 downto 0)
        );
    END COMPONENT;
    

   --Inputs
   signal cs_fetc : std_logic := '0';
   signal reset : std_logic := '0';
   signal cs_stor : std_logic := '0';
   signal if_irreadin : std_logic := '0';
   signal sta_in : std_logic := '0';
   signal lda_in : std_logic := '0';
   signal iord_in : std_logic := '0';
   signal iowr_in : std_logic := '0';
   signal pc_in : std_logic_vector(15 downto 0) := (others => '0');
   signal aluaddr_in : std_logic_vector(15 downto 0) := (others => '0');
   signal aludata_in : std_logic_vector(7 downto 0) := (others => '0');
   signal fakeIOdatain : std_logic_vector(7 downto 0) := (others => '0');

	--BiDirs
   signal m_databus : std_logic_vector(15 downto 0);

 	--Outputs
   signal fakeIOdataout : std_logic_vector(7 downto 0);
   signal storage_dataout : std_logic_vector(7 downto 0);
   signal m_cs : std_logic;
   signal m_rd : std_logic;
   signal m_wr : std_logic;
   signal m_bh : std_logic;
   signal m_bl : std_logic;
   signal m_addr : std_logic_vector(15 downto 0);
   signal ir_readout : std_logic_vector(15 downto 0);
   -- No clocks detected in port list. Replace <clock> below with 
   -- appropriate port name 
 
   constant clk_period : time := 10 ns;
 
BEGIN
 
	-- Instantiate the Unit Under Test (UUT)
   uut: MemoryAccessControl PORT MAP (
          cs_fetc => cs_fetc,
          reset => reset,
          cs_stor => cs_stor,
          if_irreadin => if_irreadin,
          sta_in => sta_in,
          lda_in => lda_in,
          iord_in => iord_in,
          iowr_in => iowr_in,
          pc_in => pc_in,
          aluaddr_in => aluaddr_in,
          aludata_in => aludata_in,
          fakeIOdatain => fakeIOdatain,
          fakeIOdataout => fakeIOdataout,
          storage_dataout => storage_dataout,
          m_cs => m_cs,
          m_rd => m_rd,
          m_wr => m_wr,
          m_bh => m_bh,
          m_bl => m_bl,
          m_addr => m_addr,
          m_databus => m_databus,
          ir_readout => ir_readout
        );



   -- Stimulus process
   stim_proc: process
   begin		
      -- hold reset state for 100 ns.
		
		reset<='1';
      wait for 100 ns;	
		
		reset<='0'; --取指令
		cs_fetc<='1';
		if_irreadin<='1';
		pc_in<="0011110000111100";
		wait for 1 ns;
		m_databus<="0001100010000000";
      wait for clk_period*10; --读数
		cs_fetc<='0';
		cs_stor<='1';
		aluaddr_in<="1111000011111111";
		aludata_in<="01000001";
		lda_in<='1';
		wait for 1 ns;
		m_databus<="1111111101010101";
		
		wait for clk_period*10;
		cs_stor<='0';
		wait for clk_period*10;--存数 sta
		cs_stor<='1';
		sta_in<='1';lda_in<='0';
		aluaddr_in<="1111000011111111";
		aludata_in<="01000001";
		m_databus<="ZZZZZZZZZZZZZZZZ";
		
		
		wait for clk_period*10;
		cs_stor<='0';
		wait for clk_period*10;--读io
		cs_stor<='1';
		sta_in<='0';
		iord_in<='1';
		wait for 1 ns;
		fakeIOdatain<="00001111";
      -- insert stimulus here 
		
		
		wait for clk_period*10;
		cs_stor<='0';
		wait for clk_period*10;--写io
		cs_stor<='1';
		iowr_in<='1';iord_in<='0';
		aludata_in<="00011000";
      wait;
   end process;

END;
