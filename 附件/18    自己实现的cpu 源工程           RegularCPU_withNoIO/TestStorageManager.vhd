--------------------------------------------------------------------------------
-- Company: 
-- Engineer:
--
-- Create Date:   11:04:13 07/27/2016
-- Design Name:   
-- Module Name:   H:/RegularCPU_withNoIO/TestStorageManager.vhd
-- Project Name:  RegularCPU
-- Target Device:  
-- Tool versions:  
-- Description:   
-- 
-- VHDL Test Bench Created by ISE for module: StorageManager
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
 
ENTITY TestStorageManager IS
END TestStorageManager;
 
ARCHITECTURE behavior OF TestStorageManager IS 
 
    -- Component Declaration for the Unit Under Test (UUT)
 
    COMPONENT StorageManager
    PORT(
         cs : IN  std_logic;
         cs_alu : IN  std_logic;
         cs_writ : IN  std_logic;
         reset : IN  std_logic;
         res_in : IN  std_logic_vector(15 downto 0);
         m_datain : IN  std_logic_vector(7 downto 0);
         if_extern : IN  std_logic;
         if_io : IN  std_logic;
         if_read : IN  std_logic;
         iord : OUT  std_logic;
         iowr : OUT  std_logic;
         sta : OUT  std_logic;
         lda : OUT  std_logic;
         data_out : OUT  std_logic_vector(15 downto 0)
        );
    END COMPONENT;
    

   --Inputs
   signal cs : std_logic := '0';
   signal cs_alu : std_logic := '0';
   signal cs_writ : std_logic := '0';
   signal reset : std_logic := '0';
   signal res_in : std_logic_vector(15 downto 0) := (others => '0');
   signal m_datain : std_logic_vector(7 downto 0) := (others => '0');
   signal if_extern : std_logic := '0';
   signal if_io : std_logic := '0';
   signal if_read : std_logic := '0';

 	--Outputs
   signal iord : std_logic;
   signal iowr : std_logic;
   signal sta : std_logic;
   signal lda : std_logic;
   signal data_out : std_logic_vector(15 downto 0);
   -- No clocks detected in port list. Replace <clock> below with 
   -- appropriate port name 
 
   constant clock_period : time := 10 ns;
 
BEGIN
 
	-- Instantiate the Unit Under Test (UUT)
   uut: StorageManager PORT MAP (
          cs => cs,
          cs_alu => cs_alu,
          cs_writ => cs_writ,
          reset => reset,
          res_in => res_in,
          m_datain => m_datain,
          if_extern => if_extern,
          if_io => if_io,
          if_read => if_read,
          iord => iord,
          iowr => iowr,
          sta => sta,
          lda => lda,
          data_out => data_out
        );



   -- Stimulus process
   stim_proc: process
   begin		
      -- hold reset state for 100 ns.
      wait for 100 ns;	
		
		reset<='1';
      wait for clock_period*10;
		reset<='0';
		cs_alu<='1';
		if_extern<='1';--¶Áio
		if_io<='1';
		if_read<='1';
		wait for clock_period*10;
		cs_alu<='0';
		cs<='1';
		wait for 1 ns;
		m_datain<="11001100";
		wait for clock_period*10;
		cs<='0';
		cs_alu<='1';
		if_extern<='1';
		if_io<='0';
		if_read<='0';
		wait for  clock_period*10;
		cs_alu<='0';
		cs<='1';
     

      wait;
   end process;

END;
